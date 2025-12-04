"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const PARTICLE_COUNT = 150000;
const TEXT_PARTICLE_RATIO = 0.7; // 70% de partículas para el texto

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
      const gravityActive = uniform(0.0); // 1.0 = gravity on, 0.0 = off

      // UFO abduction system
      const ufoPosition = uniform(new THREE.Vector3(-20, 5, 0));
      const ufoActive = uniform(0.0); // 1.0 = abducting, 0.0 = off
      const abductionRadius = uniform(1.5); // Beam width matching UFO

      // Storage buffers for GPGPU
      const positions = instancedArray(PARTICLE_COUNT, "vec3");
      const velocities = instancedArray(PARTICLE_COUNT, "vec3");
      const targetPositions = instancedArray(PARTICLE_COUNT, "vec3");
      const colors = instancedArray(PARTICLE_COUNT, "vec3");
      const isTextParticle = instancedArray(PARTICLE_COUNT, "float"); // 1.0 = text, 0.0 = background
      const isAbsorbedPermanent = instancedArray(PARTICLE_COUNT, "float"); // 1.0 = absorbed by UFO

      // Generate text positions for "Neumor Studio" (with space)
      const textPoints: Vec3Like[] = [];
      const textParticleCount = Math.floor(PARTICLE_COUNT * TEXT_PARTICLE_RATIO);

      const text = "Neumor Studio";
      const letterSpacing = 2.4;
      const startX = -(text.length * letterSpacing) / 2 + letterSpacing / 2;
      const scale = 2.4;

      // Function to generate points along a line
      const generateLinePoints = (x1: number, y1: number, x2: number, y2: number, count: number) => {
        const points: [number, number][] = [];
        for (let i = 0; i <= count; i++) {
          const t = i / count;
          points.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
        }
        return points;
      };

      // Generate arc points
      const generateArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number, count: number) => {
        const points: [number, number][] = [];
        for (let i = 0; i <= count; i++) {
          const t = i / count;
          const angle = startAngle + (endAngle - startAngle) * t;
          points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
        }
        return points;
      };

      const letterPatterns: { [key: string]: [number, number][] } = {
        // N - uppercase
        N: [
          ...generateLinePoints(0, 0, 0, 1, 20),
          ...generateLinePoints(0.1, 0, 0.1, 1, 20),
          ...generateLinePoints(0.05, 1, 0.95, 0, 25),
          ...generateLinePoints(0.15, 1, 1, 0.05, 25),
          ...generateLinePoints(0.9, 0, 0.9, 1, 20),
          ...generateLinePoints(1, 0, 1, 1, 20),
        ],
        // e - lowercase
        e: [
          ...generateArc(0.5, 0.35, 0.35, 0, Math.PI * 1.7, 30),
          ...generateArc(0.5, 0.35, 0.25, 0, Math.PI * 1.7, 25),
          ...generateLinePoints(0.15, 0.35, 0.85, 0.35, 15),
          ...generateLinePoints(0.15, 0.42, 0.85, 0.42, 15),
        ],
        // u - lowercase (improved alignment)
        u: [
          // Left vertical stem
          ...generateLinePoints(0.15, 0.7, 0.15, 0.25, 18),
          ...generateLinePoints(0.25, 0.7, 0.25, 0.25, 18),
          // Bottom curve - centered and connecting both stems
          ...generateArc(0.5, 0.25, 0.25, Math.PI, Math.PI * 2, 22),
          ...generateArc(0.5, 0.25, 0.35, Math.PI, Math.PI * 2, 25),
          ...generateArc(0.5, 0.25, 0.30, Math.PI, Math.PI * 2, 23),
          // Right vertical stem (matching left)
          ...generateLinePoints(0.75, 0.25, 0.75, 0.7, 18),
          ...generateLinePoints(0.85, 0.25, 0.85, 0.7, 18),
          // Small tail on right
          ...generateLinePoints(0.85, 0.0, 0.85, 0.25, 10),
        ],
        // m - lowercase
        m: [
          ...generateLinePoints(0, 0, 0, 0.7, 20),
          ...generateLinePoints(0.1, 0, 0.1, 0.7, 20),
          ...generateArc(0.3, 0.5, 0.2, Math.PI, 0, 15),
          ...generateLinePoints(0.5, 0, 0.5, 0.5, 15),
          ...generateArc(0.7, 0.5, 0.2, Math.PI, 0, 15),
          ...generateLinePoints(0.9, 0, 0.9, 0.5, 15),
          ...generateLinePoints(1, 0, 1, 0.5, 15),
        ],
        // o - lowercase
        o: [
          ...generateArc(0.5, 0.35, 0.35, 0, Math.PI * 2, 35),
          ...generateArc(0.5, 0.35, 0.25, 0, Math.PI * 2, 30),
          ...generateArc(0.5, 0.35, 0.3, 0, Math.PI * 2, 32),
        ],
        // r - lowercase
        r: [
          ...generateLinePoints(0.1, 0, 0.1, 0.7, 20),
          ...generateLinePoints(0.2, 0, 0.2, 0.7, 20),
          ...generateArc(0.55, 0.5, 0.35, Math.PI, Math.PI * 0.35, 18),
          ...generateArc(0.55, 0.5, 0.25, Math.PI, Math.PI * 0.4, 15),
        ],
        // S - uppercase (improved)
        S: [
          // Top curve
          ...generateArc(0.5, 0.75, 0.35, Math.PI * 0.1, Math.PI * 1.1, 25),
          ...generateArc(0.5, 0.75, 0.25, Math.PI * 0.15, Math.PI * 1.05, 22),
          ...generateArc(0.5, 0.75, 0.3, Math.PI * 0.1, Math.PI * 1.1, 23),
          // Middle connection
          ...generateLinePoints(0.2, 0.55, 0.8, 0.45, 15),
          ...generateLinePoints(0.25, 0.5, 0.75, 0.4, 12),
          // Bottom curve
          ...generateArc(0.5, 0.25, 0.35, Math.PI * 1.1, Math.PI * 2.1, 25),
          ...generateArc(0.5, 0.25, 0.25, Math.PI * 1.15, Math.PI * 2.05, 22),
          ...generateArc(0.5, 0.25, 0.3, Math.PI * 1.1, Math.PI * 2.1, 23),
        ],
        // t - lowercase (clean)
        t: [
          // Vertical stem
          ...generateLinePoints(0.4, 0, 0.4, 1, 25),
          ...generateLinePoints(0.5, 0, 0.5, 1, 25),
          ...generateLinePoints(0.6, 0, 0.6, 1, 25),
          // Horizontal crossbar
          ...generateLinePoints(0.1, 0.65, 0.9, 0.65, 20),
          ...generateLinePoints(0.1, 0.72, 0.9, 0.72, 20),
        ],
        // d - lowercase (improved)
        d: [
          ...generateArc(0.4, 0.35, 0.35, Math.PI * 0.5, Math.PI * 2.5, 35),
          ...generateArc(0.4, 0.35, 0.25, Math.PI * 0.5, Math.PI * 2.5, 30),
          ...generateLinePoints(0.75, 0, 0.75, 1, 25),
          ...generateLinePoints(0.85, 0, 0.85, 1, 25),
          ...generateLinePoints(0.8, 0, 0.8, 1, 25),
        ],
        // i - lowercase (improved)
        i: [
          ...generateLinePoints(0.4, 0, 0.4, 0.6, 20),
          ...generateLinePoints(0.5, 0, 0.5, 0.6, 20),
          ...generateLinePoints(0.6, 0, 0.6, 0.6, 20),
          ...generateArc(0.5, 0.82, 0.1, 0, Math.PI * 2, 18),
          ...generateArc(0.5, 0.82, 0.06, 0, Math.PI * 2, 15),
        ],
        // Space - empty
        " ": [],
      };

      // Generate dense points for each letter
      // Count total pattern points (excluding spaces)
      let totalPatternPoints = 0;
      for (const letter of text) {
        const pattern = letterPatterns[letter];
        if (pattern && pattern.length > 0) {
          totalPatternPoints += pattern.length;
        }
      }

      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const pattern = letterPatterns[letter];
        const baseX = startX + i * letterSpacing;

        // Skip spaces
        if (!pattern || pattern.length === 0) continue;

        // Very high density for text particles
        const density = Math.ceil(textParticleCount / totalPatternPoints);

        pattern.forEach(([px, py]) => {
          for (let d = 0; d < density && textPoints.length < textParticleCount; d++) {
            const offsetX = (Math.random() - 0.5) * 0.15;
            const offsetY = (Math.random() - 0.5) * 0.15;
            const offsetZ = (Math.random() - 0.5) * 0.5;
            textPoints.push({
              x: baseX + (px - 0.5) * scale + offsetX,
              y: (py - 0.5) * scale + offsetY,
              z: offsetZ
            });
          }
        });
      }

      // Mark how many are text particles
      const textParticleEnd = textPoints.length;

      // Fill remaining particles with background sphere positions
      while (textPoints.length < PARTICLE_COUNT) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 12 + Math.random() * 18;
        textPoints.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi) * 0.5
        });
      }

      // Compute shader: Initialize particles
      const textParticleEndUniform = uniform(textParticleEnd);

      const computeInit = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);
        const color = colors.element(idx);
        const isText = isTextParticle.element(idx);
        const target = targetPositions.element(idx);
        const absorbed = isAbsorbedPermanent.element(idx);

        // Initialize as not absorbed
        absorbed.assign(float(0.0));

        // Start particles VERY close to their target with tiny random offset
        // This makes the initial formation nearly instant
        const offsetX = hash(idx).sub(0.5).mul(1.0);
        const offsetY = hash(idx.add(1)).sub(0.5).mul(1.0);
        const offsetZ = hash(idx.add(2)).sub(0.5).mul(0.5);

        position.x = target.x.add(offsetX);
        position.y = target.y.add(offsetY);
        position.z = target.z.add(offsetZ);

        // Strong initial velocity towards target for instant convergence
        const toTarget = target.sub(position);
        velocity.assign(toTarget.mul(0.3));

        // Determine if this is a text particle
        const isTextFloat = float(idx).lessThan(textParticleEndUniform).select(float(1.0), float(0.0));
        isText.assign(isTextFloat);

        // Different colors for text vs background
        const colorMix = hash(idx.add(3));

        // Text particles: Vibrant cyan/teal gradient (bright and prominent)
        const textCyan = vec3(0.0, 0.95, 1.0);
        const textTeal = vec3(0.2, 1.0, 0.85);
        const textWhite = vec3(0.9, 1.0, 1.0);
        const textColor = mix(mix(textCyan, textTeal, colorMix), textWhite, hash(idx.add(5)).mul(0.3));

        // Background particles: Dim purple/pink (subtle)
        const bgPurple = vec3(0.3, 0.15, 0.4);
        const bgPink = vec3(0.4, 0.2, 0.35);
        const bgColor = mix(bgPurple, bgPink, colorMix).mul(0.5);

        // Apply color based on particle type
        color.assign(mix(bgColor, textColor, isTextFloat));

      })().compute(PARTICLE_COUNT);

      // Compute shader: Update particles each frame
      const computeUpdate = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);
        const target = targetPositions.element(idx);
        const isText = isTextParticle.element(idx);
        const absorbed = isAbsorbedPermanent.element(idx);

        // If already absorbed, keep hidden far away
        If(absorbed.greaterThan(0.5), () => {
          position.assign(vec3(0, 100, 0)); // Keep far off screen
          velocity.assign(vec3(0, 0, 0));
        });

        // GRAVITY EFFECT: Apply downward force when active
        const gravityForce = vec3(0, -0.15, 0).mul(gravityActive);
        velocity.addAssign(gravityForce);

        // UFO ABDUCTION: Pull particles up towards UFO when in beam
        const toUfo = ufoPosition.sub(position);
        const horizontalDist = toUfo.x.abs(); // Distance in X axis
        const beamStrength = float(1.0).sub(horizontalDist.div(abductionRadius)).max(0.0);
        const inBeam = beamStrength.greaterThan(0.1).and(ufoActive.greaterThan(0.5));

        // When particle reaches UFO, mark as permanently absorbed
        const reachedUfo = position.y.greaterThan(ufoPosition.y.sub(1.0));
        const shouldAbsorb = inBeam.and(reachedUfo);

        If(shouldAbsorb, () => {
          absorbed.assign(float(1.0)); // Mark as permanently absorbed
          position.assign(vec3(0, 100, 0)); // Teleport away
          velocity.assign(vec3(0, 0, 0));
        });

        // Strong upward pull (only if not absorbed and in beam)
        const abductForce = vec3(
          toUfo.x.mul(0.05),  // Horizontal centering
          float(0.3),         // Strong upward pull
          toUfo.z.mul(0.03)   // Z centering
        ).mul(beamStrength).mul(ufoActive);

        // Add spiral motion for cool effect
        const spiralAngle = timeNode.mul(4.0).add(hash(idx).mul(6.28));
        const spiralForce = vec3(
          sin(spiralAngle).mul(0.04),
          float(0),
          cos(spiralAngle).mul(0.04)
        ).mul(beamStrength).mul(ufoActive);

        velocity.addAssign(abductForce.add(spiralForce));

        // Attraction to target - disabled for absorbed particles
        const isNotAbsorbed = absorbed.lessThan(0.5);
        const effectsActive = gravityActive.add(ufoActive.mul(beamStrength)).min(1.0);
        const attractionMultiplier = float(1.0).sub(effectsActive.mul(0.85)).mul(isNotAbsorbed.select(float(1.0), float(0.0)));

        const toTarget = target.sub(position);
        const distToTarget = toTarget.length();

        // Text particles have stronger attraction to form letters clearly
        const textAttraction = float(0.12);
        const bgAttraction = float(0.04);
        const currentAttraction = mix(bgAttraction, textAttraction, isText).mul(attractionMultiplier);

        const attractForce = toTarget.normalize().mul(currentAttraction).mul(distToTarget.min(5.0));
        velocity.addAssign(attractForce);

        // Mouse repulsion - affects both but text particles return faster
        const toMouse = position.sub(mousePosition);
        const distToMouse = toMouse.length();

        If(distToMouse.lessThan(repulsionRadius), () => {
          const repelForce = toMouse.normalize().mul(repulsionStrength).mul(
            float(1.0).sub(distToMouse.div(repulsionRadius))
          );
          velocity.addAssign(repelForce);
        });

        // Subtle floating motion for organic feel
        const floatSpeed = float(0.0008);
        const floatOffset = hash(idx).mul(6.28);
        const floatX = sin(timeNode.mul(0.5).add(floatOffset)).mul(floatSpeed);
        const floatY = cos(timeNode.mul(0.4).add(floatOffset.mul(1.3))).mul(floatSpeed);
        velocity.addAssign(vec3(floatX, floatY, float(0)));

        // Apply velocity with moderate friction for fast but smooth movement
        const smoothFriction = float(0.88);
        velocity.mulAssign(smoothFriction);
        position.addAssign(velocity);

      });

      const computeParticles = computeUpdate().compute(PARTICLE_COUNT);

      // Compute shader: Explosion effect on click
      const explosionRadius = uniform(8.0); // Large radius for dramatic effect
      const explosionForce = uniform(2.5);  // Strong force

      const computeInteract = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);

        const toMouse = position.sub(mousePosition);
        const dist = toMouse.length();

        // Explosion affects particles within radius
        If(dist.lessThan(explosionRadius), () => {
          const direction = toMouse.normalize();
          // Power decreases with distance but stays strong
          const power = float(1.0).sub(dist.div(explosionRadius)).pow(0.5);
          // Random variation for organic feel
          const randomBoost = hash(idx.add(timeNode.mul(1000))).mul(0.6).add(0.7);
          // Random angle offset for more chaotic explosion
          const angleOffset = hash(idx.add(7)).sub(0.5).mul(0.5);
          const explosionX = direction.x.add(angleOffset);
          const explosionY = direction.y.add(hash(idx.add(11)).sub(0.5).mul(0.5));
          const explosionZ = hash(idx.add(13)).sub(0.5).mul(2.0);
          const explosionDir = vec3(explosionX, explosionY, explosionZ).normalize();

          // Apply strong explosive force
          velocity.addAssign(explosionDir.mul(power).mul(randomBoost).mul(explosionForce));
        });

      })().compute(PARTICLE_COUNT);

      // Compute shader: Global explosion (one-shot, runs once on spacebar)
      const computeGlobalExplosion = Fn(() => {
        const idx = instanceIndex;
        const position = positions.element(idx);
        const velocity = velocities.element(idx);

        // Explosion from center outward
        const direction = position.normalize();
        // Random variation for organic feel
        const randomX = hash(idx).sub(0.5).mul(0.8);
        const randomY = hash(idx.add(1)).sub(0.5).mul(0.8);
        const randomZ = hash(idx.add(2)).sub(0.5).mul(1.5);
        const explosionDir = direction.add(vec3(randomX, randomY, randomZ)).normalize();

        // Strong impulse
        const force = float(1.8);
        velocity.addAssign(explosionDir.mul(force));

      })().compute(PARTICLE_COUNT);

      // Particle material with TSL
      const material = new THREE.SpriteNodeMaterial();

      // Get if particle is text
      const isText = isTextParticle.element(instanceIndex);

      // Dynamic color with time-based shimmer - stronger for text
      const baseColor = colors.element(instanceIndex);
      const textShimmer = sin(timeNode.mul(1.5).add(hash(instanceIndex).mul(8))).mul(0.2).add(1.1);
      const bgShimmer = float(0.6);
      const shimmer = mix(bgShimmer, textShimmer, isText);
      material.colorNode = baseColor.mul(shimmer);

      // Position from storage buffer
      material.positionNode = positions.toAttribute();

      // Size - text particles are larger and more visible
      const textSize = float(0.12);
      const bgSize = float(0.05);
      const baseSize = mix(bgSize, textSize, isText);
      const sizeVariation = hash(instanceIndex).mul(0.3).add(0.85);
      material.scaleNode = baseSize.mul(sizeVariation);

      // Circular shape with soft edges - text particles more opaque
      const textOpacity = float(0.95);
      const bgOpacity = float(0.4);
      const particleOpacity = mix(bgOpacity, textOpacity, isText);
      material.opacityNode = shapeCircle().mul(particleOpacity);
      material.transparent = true;
      material.depthWrite = false;
      material.blending = THREE.AdditiveBlending;

      // Create sprite with instancing
      const particles = new THREE.Sprite(material);
      particles.count = PARTICLE_COUNT;
      particles.frustumCulled = false;
      scene.add(particles);

      // UFO mesh - classic flying saucer using LatheGeometry
      const ufoGroup = new THREE.Group();

      // Create saucer profile (classic UFO shape)
      const saucerPoints = [];
      // Bottom center
      saucerPoints.push(new THREE.Vector2(0, -0.08));
      // Bottom curve outward
      saucerPoints.push(new THREE.Vector2(0.15, -0.1));
      saucerPoints.push(new THREE.Vector2(0.35, -0.08));
      // Wide rim
      saucerPoints.push(new THREE.Vector2(0.6, 0));
      // Top curve inward
      saucerPoints.push(new THREE.Vector2(0.35, 0.06));
      saucerPoints.push(new THREE.Vector2(0.2, 0.08));
      // Top center (where dome sits)
      saucerPoints.push(new THREE.Vector2(0.12, 0.08));

      const saucerGeometry = new THREE.LatheGeometry(saucerPoints, 32);
      const saucerMaterial = new THREE.MeshBasicMaterial({
        color: 0x556677,
        transparent: true,
        opacity: 0.95,
      });
      const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
      ufoGroup.add(saucer);

      // Glass dome on top (cockpit)
      const domeGeometry = new THREE.SphereGeometry(0.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMaterial = new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.7,
      });
      const dome = new THREE.Mesh(domeGeometry, domeMaterial);
      dome.position.y = 0.08;
      ufoGroup.add(dome);

      // Glowing rim light
      const rimGeometry = new THREE.TorusGeometry(0.58, 0.025, 8, 32);
      const rimMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
      });
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0;
      ufoGroup.add(rim);

      // Small lights around the rim
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const lightGeom = new THREE.SphereGeometry(0.03, 8, 8);
        const lightMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xff3333 : 0x33ff66,
        });
        const light = new THREE.Mesh(lightGeom, lightMat);
        light.position.set(Math.cos(angle) * 0.5, -0.04, Math.sin(angle) * 0.5);
        ufoGroup.add(light);
      }

      // Tractor beam (wide at bottom, narrow at top) - very translucent
      const beamPoints = [];
      beamPoints.push(new THREE.Vector2(0.08, 0));    // Top (narrow, at UFO)
      beamPoints.push(new THREE.Vector2(0.5, -2.5));  // Middle
      beamPoints.push(new THREE.Vector2(1.0, -5));    // Bottom (wide)
      const beamGeometry = new THREE.LatheGeometry(beamPoints, 24);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.03,  // Much more translucent
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.y = -0.1;
      ufoGroup.add(beam);

      // Scale the whole UFO
      ufoGroup.scale.set(1.5, 1.5, 1.5);

      // Position UFO off-screen initially
      ufoGroup.position.set(-20, 5, 0);
      ufoGroup.visible = false;
      scene.add(ufoGroup);

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

      // Double click: Gravity drop effect
      let gravityTimeout: ReturnType<typeof setTimeout> | null = null;
      const handleDoubleClick = () => {
        // Activate gravity
        gravityActive.value = 1.0;

        // After 1.5 seconds, deactivate gravity so particles reform
        if (gravityTimeout) clearTimeout(gravityTimeout);
        gravityTimeout = setTimeout(() => {
          gravityActive.value = 0.0;
        }, 1500);
      };

      // Spacebar: Global explosion (one-shot)
      // U key: UFO abduction sequence
      let ufoAnimationId: number | null = null;
      let isUfoAnimating = false;

      const startUfoAbduction = () => {
        if (isUfoAnimating) return;
        isUfoAnimating = true;

        // Letter positions (based on text and spacing)
        const letterCount = text.replace(" ", "").length; // 12 letters without space
        const letterPositions: number[] = [];
        for (let i = 0; i < text.length; i++) {
          if (text[i] !== " ") {
            letterPositions.push(startX + i * letterSpacing);
          }
        }

        // Animation parameters
        const startPos = startX - 3; // Start before first letter
        const endPos = letterPositions[letterPositions.length - 1] + 3; // End after last
        let currentLetterIndex = 0;
        let pauseTime = 0;
        const pauseDuration = 800; // ms to pause at each letter
        const moveSpeed = 0.08; // Speed between letters

        ufoGroup.visible = true;
        ufoGroup.position.x = startPos;
        ufoPosition.value.x = startPos;
        ufoActive.value = 1.0;

        let lastTime = performance.now();

        const animateUfo = () => {
          const now = performance.now();
          const delta = now - lastTime;
          lastTime = now;

          if (currentLetterIndex < letterPositions.length) {
            const targetX = letterPositions[currentLetterIndex];

            if (Math.abs(ufoGroup.position.x - targetX) > 0.1) {
              // Move towards letter
              ufoGroup.position.x += moveSpeed * Math.sign(targetX - ufoGroup.position.x);
              ufoPosition.value.x = ufoGroup.position.x;
            } else {
              // At letter, pause and abduct
              pauseTime += delta;
              if (pauseTime >= pauseDuration) {
                pauseTime = 0;
                currentLetterIndex++;
              }
            }
          } else {
            // All letters done, fly away
            ufoGroup.position.x += moveSpeed * 1.5;
            ufoGroup.position.y += 0.02;
            ufoPosition.value.x = ufoGroup.position.x;
            ufoPosition.value.y = ufoGroup.position.y;

            if (ufoGroup.position.x > endPos + 10) {
              // Animation complete, reset after delay
              ufoActive.value = 0.0;
              ufoGroup.visible = false;
              isUfoAnimating = false;

              // Reset UFO position for next time
              setTimeout(() => {
                ufoGroup.position.set(-20, 5, 0);
                ufoPosition.value.set(-20, 5, 0);
              }, 3000);
              return;
            }
          }

          // Wobble effect
          ufoGroup.rotation.z = Math.sin(now * 0.003) * 0.1;
          ufoGroup.rotation.x = Math.sin(now * 0.002) * 0.05;

          ufoAnimationId = requestAnimationFrame(animateUfo);
        };

        animateUfo();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
          event.preventDefault();
          // Single compute call - instant explosion
          renderer.compute(computeGlobalExplosion);
        } else if (event.code === "KeyU") {
          event.preventDefault();
          startUfoAbduction();
        }
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("click", handleClick);
      container.addEventListener("dblclick", handleDoubleClick);
      window.addEventListener("keydown", handleKeyDown);

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
        if (ufoAnimationId) cancelAnimationFrame(ufoAnimationId);
        if (gravityTimeout) clearTimeout(gravityTimeout);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("click", handleClick);
        container.removeEventListener("dblclick", handleDoubleClick);
        window.removeEventListener("keydown", handleKeyDown);
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
      {/* Loading overlay with fade out */}
      <div className={`tipo3-loading ${!loading ? 'tipo3-loading--hidden' : ''}`}>
        <div className="tipo3-loading-content">
          <div className="tipo3-loading-logo">NS</div>
          <div className="tipo3-loading-bar">
            <div className="tipo3-loading-bar__fill" />
          </div>
          <p>Cargando experiencia WebGPU...</p>
        </div>
      </div>
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
