"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const PARTICLE_COUNT = 100000;

interface Vec3Like {
  x: number;
  y: number;
  z: number;
}

export function ParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initScene = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      // Dynamic imports for Three.js WebGPU modules
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = await import("three/webgpu") as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const TSL = await import("three/tsl") as any;

      const {
        Fn, If, uniform, float, vec3, hash,
        instancedArray, instanceIndex, sin, cos,
        time, mix, shapeCircle
      } = TSL;

      // Check WebGPU support
      if (!navigator.gpu) {
        setSupported(false);
        setLoading(false);
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        setSupported(false);
        setLoading(false);
        return;
      }

      setSupported(true);

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0f);

      // Camera
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 0, 25);

      // Uniforms
      const mousePosition = uniform(new THREE.Vector3(0, 0, 0));
      const timeNode = time; // time is already a node in TSL r181+
      const friction = uniform(0.98);
      const particleSize = uniform(0.08);
      const attractionStrength = uniform(0.015);
      const repulsionStrength = uniform(0.08);
      const repulsionRadius = uniform(3.0);

      // Storage buffers for GPGPU
      const positions = instancedArray(PARTICLE_COUNT, "vec3");
      const velocities = instancedArray(PARTICLE_COUNT, "vec3");
      const targetPositions = instancedArray(PARTICLE_COUNT, "vec3");
      const colors = instancedArray(PARTICLE_COUNT, "vec3");

      // Generate text positions for "NEUMOR"
      const textPoints: Vec3Like[] = [];
      const text = "NEUMOR";
      const letterSpacing = 3.5;
      const startX = -(text.length * letterSpacing) / 2 + letterSpacing / 2;

      // Simple letter patterns using points
      const letterPatterns: { [key: string]: [number, number][] } = {
        N: [
          [0, 0], [0, 0.25], [0, 0.5], [0, 0.75], [0, 1],
          [0.25, 0.75], [0.5, 0.5], [0.75, 0.25],
          [1, 0], [1, 0.25], [1, 0.5], [1, 0.75], [1, 1]
        ],
        E: [
          [0, 0], [0, 0.25], [0, 0.5], [0, 0.75], [0, 1],
          [0.25, 0], [0.5, 0], [0.75, 0], [1, 0],
          [0.25, 0.5], [0.5, 0.5], [0.75, 0.5],
          [0.25, 1], [0.5, 1], [0.75, 1], [1, 1]
        ],
        U: [
          [0, 0.25], [0, 0.5], [0, 0.75], [0, 1],
          [0.25, 0], [0.5, 0], [0.75, 0],
          [1, 0.25], [1, 0.5], [1, 0.75], [1, 1]
        ],
        M: [
          [0, 0], [0, 0.25], [0, 0.5], [0, 0.75], [0, 1],
          [0.25, 0.75], [0.5, 0.5], [0.75, 0.75],
          [1, 0], [1, 0.25], [1, 0.5], [1, 0.75], [1, 1]
        ],
        O: [
          [0.25, 0], [0.5, 0], [0.75, 0],
          [0, 0.25], [0, 0.5], [0, 0.75],
          [1, 0.25], [1, 0.5], [1, 0.75],
          [0.25, 1], [0.5, 1], [0.75, 1]
        ],
        R: [
          [0, 0], [0, 0.25], [0, 0.5], [0, 0.75], [0, 1],
          [0.25, 1], [0.5, 1], [0.75, 1],
          [1, 0.75], [1, 0.85],
          [0.25, 0.5], [0.5, 0.5], [0.75, 0.5],
          [0.75, 0.25], [1, 0]
        ]
      };

      // Generate dense points for each letter
      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const pattern = letterPatterns[letter] || [];
        const baseX = startX + i * letterSpacing;

        // Scale and density
        const scale = 2.5;
        const density = 12;

        pattern.forEach(([px, py]) => {
          for (let d = 0; d < density; d++) {
            const offsetX = (Math.random() - 0.5) * 0.3;
            const offsetY = (Math.random() - 0.5) * 0.3;
            const offsetZ = (Math.random() - 0.5) * 0.5;
            textPoints.push({
              x: baseX + (px - 0.5) * scale + offsetX,
              y: (py - 0.5) * scale + offsetY,
              z: offsetZ
            });
          }
        });
      }

      // Fill remaining particles with random sphere positions
      while (textPoints.length < PARTICLE_COUNT) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 8 + Math.random() * 15;
        textPoints.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi)
        });
      }

      // Compute shader: Initialize particles
      const computeInit = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);
        const color = colors.element(idx);

        // Random sphere distribution for initial positions
        const theta = hash(idx).mul(Math.PI * 2);
        const phi = hash(idx.add(1)).mul(Math.PI);
        const r = hash(idx.add(2)).mul(15).add(5);

        position.x = r.mul(sin(phi)).mul(cos(theta));
        position.y = r.mul(sin(phi)).mul(sin(theta));
        position.z = r.mul(cos(phi));

        velocity.assign(vec3(0, 0, 0));

        // Color gradient: cyan to magenta to gold
        const colorMix = hash(idx.add(3));
        const cyan = vec3(0.2, 0.8, 1.0);
        const magenta = vec3(1.0, 0.2, 0.8);
        const gold = vec3(1.0, 0.8, 0.2);

        const c1 = mix(cyan, magenta, colorMix);
        const c2 = mix(magenta, gold, colorMix);
        color.assign(mix(c1, c2, hash(idx.add(4))));

      })().compute(PARTICLE_COUNT);

      // Compute shader: Update particles each frame
      const computeUpdate = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);
        const target = targetPositions.element(idx);

        // Attraction to target position
        const toTarget = target.sub(position);
        const distToTarget = toTarget.length();
        const attractForce = toTarget.normalize().mul(attractionStrength).mul(distToTarget.min(1.0));
        velocity.addAssign(attractForce);

        // Mouse repulsion
        const toMouse = position.sub(mousePosition);
        const distToMouse = toMouse.length();

        If(distToMouse.lessThan(repulsionRadius), () => {
          const repelForce = toMouse.normalize().mul(repulsionStrength).mul(
            float(1.0).sub(distToMouse.div(repulsionRadius))
          );
          velocity.addAssign(repelForce);
        });

        // Subtle orbital motion
        const orbitalSpeed = float(0.001);
        const tangent = vec3(
          position.y.mul(orbitalSpeed),
          position.x.negate().mul(orbitalSpeed),
          float(0)
        );
        velocity.addAssign(tangent);

        // Apply velocity with friction
        velocity.mulAssign(friction);
        position.addAssign(velocity);

      });

      const computeParticles = computeUpdate().compute(PARTICLE_COUNT);

      // Compute shader: Mouse interaction burst
      const computeInteract = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);

        const toMouse = position.sub(mousePosition);
        const dist = toMouse.length();

        If(dist.lessThan(repulsionRadius.mul(1.5)), () => {
          const direction = toMouse.normalize();
          const power = float(1.0).sub(dist.div(repulsionRadius.mul(1.5)));
          const randomBoost = hash(idx.add(timeNode.mul(100))).mul(0.5).add(0.5);
          velocity.addAssign(direction.mul(power).mul(randomBoost).mul(0.3));
        });

      })().compute(PARTICLE_COUNT);

      // Particle material with TSL
      const material = new THREE.SpriteNodeMaterial();

      // Dynamic color with time-based shimmer
      const baseColor = colors.element(instanceIndex);
      const shimmer = sin(timeNode.mul(2).add(hash(instanceIndex).mul(10))).mul(0.15).add(1);
      material.colorNode = baseColor.mul(shimmer);

      // Position from storage buffer
      material.positionNode = positions.toAttribute();

      // Size with variation
      const sizeVariation = hash(instanceIndex).mul(0.5).add(0.75);
      material.scaleNode = particleSize.mul(sizeVariation);

      // Circular shape with soft edges
      material.opacityNode = shapeCircle().mul(0.9);
      material.transparent = true;
      material.depthWrite = false;
      material.blending = THREE.AdditiveBlending;

      // Create sprite with instancing
      const particles = new THREE.Sprite(material);
      particles.count = PARTICLE_COUNT;
      particles.frustumCulled = false;
      scene.add(particles);

      // Add ambient glow plane
      const glowGeometry = new THREE.PlaneGeometry(60, 30);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a1a2e,
        transparent: true,
        opacity: 0.3,
      });
      const glowPlane = new THREE.Mesh(glowGeometry, glowMaterial);
      glowPlane.position.z = -10;
      scene.add(glowPlane);

      // Renderer
      const renderer = new THREE.WebGPURenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // Initialize renderer
      await renderer.init();

      // Set target positions from text points
      const targetData = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const point = textPoints[i % textPoints.length];
        targetData[i * 3] = point.x;
        targetData[i * 3 + 1] = point.y;
        targetData[i * 3 + 2] = point.z;
      }

      // Write target positions to buffer
      const targetBuffer = targetPositions.value;
      if (targetBuffer && targetBuffer.array) {
        targetBuffer.array.set(targetData);
        targetBuffer.needsUpdate = true;
      }

      renderer.compute(computeInit);

      // Mouse interaction
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const intersectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectionPoint = new THREE.Vector3();

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        raycaster.ray.intersectPlane(intersectionPlane, intersectionPoint);
        mousePosition.value.copy(intersectionPoint);
      };

      const handleClick = () => {
        renderer.compute(computeInteract);
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("click", handleClick);

      // Animation loop
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        renderer.compute(computeParticles);
        renderer.render(scene, camera);
      };

      animate();
      setLoading(false);

      // Handle resize
      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function
      cleanupRef.current = () => {
        cancelAnimationFrame(animationId);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("click", handleClick);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };

    } catch (error) {
      console.error("WebGPU initialization error:", error);
      setSupported(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initScene();
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [initScene]);

  return (
    <div ref={containerRef} className="tipo3-canvas-shell">
      {loading && (
        <div className="tipo3-loading">
          <div className="tipo3-loading-spinner" />
          <p>Inicializando WebGPU...</p>
        </div>
      )}
      {supported === false && (
        <div className="tipo3-fallback">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tu navegador no soporta WebGPU. Te mostramos el estilo neumórfico
            estático.
          </p>
        </div>
      )}
    </div>
  );
}
