'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial, Center } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three-stdlib'

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

  // Procesamos los paths de forma que se respeten los agujeros
  const logoShapes = useMemo(() => {
    // Aplanamos todas las formas encontradas en el SVG
    return svgData.paths.flatMap(path => SVGLoader.createShapes(path))
  }, [svgData])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center >
        <group ref={meshRef} scale={0.005}> {/* Ajusta escala si necesario */}
          {logoShapes.map((shape, index) => (
            <mesh key={index} rotation={[Math.PI, 0, 0]}>
              <extrudeGeometry
                args={[
                  shape,
                  {
                    depth: 40,          // Volumen del logo
                    bevelEnabled: true, // Bordes suaves
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