'use client'

import { ThemeToggleWrapper } from "@/components/theme/ThemeToggleWrapper";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial, Center } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three-stdlib'

// Componente 3D del logo
function LogoSVG({ url }: { url: string }) {
  const svgData = useLoader(SVGLoader, url)
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
    meshRef.current.rotation.x = Math.cos(time * 0.2) * 0.05

    const { x, y } = state.pointer
    meshRef.current.rotation.y += x * 0.2
    meshRef.current.rotation.x -= y * 0.2
  })

  const logoShapes = useMemo(() => {
    return svgData.paths.flatMap(path => SVGLoader.createShapes(path))
  }, [svgData])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <group ref={meshRef} scale={0.005}>
          {logoShapes.map((shape, index) => (
            <mesh key={index} rotation={[Math.PI, 0, 0]}>
              <extrudeGeometry
                args={[
                  shape,
                  {
                    depth: 40,
                    bevelEnabled: true,
                    bevelThickness: 2,
                    bevelSize: 2,
                    bevelSegments: 5,
                  },
                ]}
              />
              <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={20}
                roughness={0.1}
                transmission={1}
                color="#ffffff"
                chromaticAberration={0.2}
                temporalDistortion={0.1}
                ior={1.5}
              />
            </mesh>
          ))}
        </group>
      </Center>
    </Float>
  )
}

// Escena 3D interactiva (grande)
export function Hero3DScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-transparent relative z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />

        <LogoSVG url="/logo3d.svg" />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Logo 3D mini para esquina
export function Logo3DMini() {
  return (
    <div className="fixed bottom-6 right-6 w-24 h-24 md:w-32 md:h-32 z-50 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />

        <LogoSVG url="/logo3d.svg" />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Hero original
export function Hero3DVideo() {
  return (
    <section
      className="
        w-full max-w-4xl mx-auto
        px-4 md:px-6
        pt-20 pb-20
        flex items-center justify-center
      "
    >
      {/* Card neumórfica del hero */}
      <div className="
        p-8 md:p-12 lg:p-16 text-center space-y-6
        rounded-2xl md:rounded-3xl
        bg-[var(--neuro-bg)]
        shadow-[8px_8px_20px_var(--neuro-dark),-8px_-8px_20px_var(--neuro-light)]
        dark:bg-gradient-to-br dark:from-[#1A202C] dark:to-[#0F141A]
        dark:shadow-[8px_8px_20px_rgba(0,0,0,0.5),-8px_-8px_20px_rgba(30,41,55,0.3)]
        border border-white/20 dark:border-slate-700/30
      ">
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Web + Panel de control + Automatizacion</span>
          </div>
          <ThemeToggleWrapper />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1A1A1A] dark:text-[#E5E7EB]">
          Tu web con panel propio.
          <span className="block text-[color:#1F8AFB] dark:text-[color:#3B82F6] mt-2">
            Edita todo sin tocar codigo.
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-[#6B7280] dark:text-[#A7B0BC] max-w-2xl mx-auto">
          Diseno premium, captacion de leads desde web y redes sociales,
          y respuestas automaticas 24/7. Todo gestionado desde tu panel.
        </p>
      </div>
    </section>
  );
}
