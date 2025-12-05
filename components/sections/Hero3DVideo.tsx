'use client'

import Link from "next/link";
import { ThemeToggleWrapper } from "@/components/theme/ThemeToggleWrapper";
import { NeumorfButton } from "@/components/ui/NeumorfButton";
import { NeumorfCard } from "@/components/ui/NeumorfCard";
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

// Escena 3D interactiva
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

// Hero original con video
export function Hero3DVideo() {
  return (
    <section
      className="
        w-full max-w-5xl mx-auto
        px-4 md:px-6
        pt-16 pb-14
        flex flex-col md:flex-row items-center gap-10
      "
    >
      {/* Columna texto */}
      <div className="flex-1 space-y-5">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs md:text-sm badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Estudio de interfaces neumórficas + automatización</span>
          </div>
          <ThemeToggleWrapper />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-[#1A1A1A] dark:text-[#E5E7EB]">
          Neumor Studio: interfaces suaves, futuristas
          <span className="block text-[color:#1F8AFB] dark:text-[color:#3B82F6]">
            y sistemas que trabajan por ti.
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#6B7280] dark:text-[#A7B0BC] max-w-xl">
          Webs en estilo neumorfismo, captación de leads y automatizaciones
          con chatbots, todo pensado para verse elegante en cualquier dispositivo.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="#contacto">
            <NeumorfButton className="neumor-pill">
              Quiero una web neumórfica
            </NeumorfButton>
          </Link>
          <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Diseño + leads + automatización en un solo sistema.
          </span>
        </div>

        <NeumorfCard className="max-w-md p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
            Vista previa
          </p>
          <h2 className="text-base md:text-lg font-semibold mb-1">
            Un estudio, tres piezas:
          </h2>
          <ul className="space-y-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
            <li>• Interfaz neumórfica que se siente suave y premium.</li>
            <li>• Sistema de captación de leads conectado a base de datos.</li>
            <li>• Respuestas automáticas con n8n (tu mini-ManyChat propio).</li>
          </ul>
        </NeumorfCard>
      </div>

      {/* Columna vídeo 3D */}
      <div className="flex-1 flex items-center justify-center">
        <div className="hero-3d-shell">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-3d-video"
          >
            <source src="/videos/black.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
