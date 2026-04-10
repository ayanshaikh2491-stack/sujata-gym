'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Box, Sphere, Cylinder } from '@react-three/drei'
import { Suspense } from 'react'

// 3D Gym Equipment Components
function Dumbbell({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Dumbbell handle */}
      <Cylinder args={[0.02, 0.02, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      {/* Weights */}
      <Box args={[0.15, 0.15, 0.1]} position={[-0.4, 0, 0]}>
        <meshStandardMaterial color="#2C2C2C" />
      </Box>
      <Box args={[0.15, 0.15, 0.1]} position={[0.4, 0, 0]}>
        <meshStandardMaterial color="#2C2C2C" />
      </Box>
    </group>
  )
}

function Treadmill({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <Box args={[1.5, 0.1, 0.8]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#4A4A4A" />
      </Box>
      {/* Console */}
      <Box args={[0.3, 0.6, 0.1]} position={[0, 0.2, -0.3]}>
        <meshStandardMaterial color="#1C1C1C" />
      </Box>
      {/* Belt area */}
      <Box args={[1.2, 0.05, 0.6]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  )
}

function WeightRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <Box args={[0.1, 2, 0.1]} position={[-0.4, 0, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      <Box args={[0.1, 2, 0.1]} position={[0.4, 0, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      <Box args={[0.8, 0.1, 0.1]} position={[0, -0.95, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>

      {/* Weights on rack */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={i}
          args={[0.15, 0.15, 0.08]}
          position={[-0.2 + (i % 2) * 0.4, -0.8 + Math.floor(i / 2) * 0.3, 0]}
        >
          <meshStandardMaterial color="#2C2C2C" />
        </Box>
      ))}
    </group>
  )
}

function GymFloor() {
  return (
    <Box args={[20, 0.1, 20]} position={[0, -0.6, 0]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
  )
}

function GymWalls() {
  return (
    <>
      {/* Back wall */}
      <Box args={[20, 8, 0.1]} position={[0, 3, -10]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
      {/* Side walls */}
      <Box args={[0.1, 8, 20]} position={[-10, 3, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
      <Box args={[0.1, 8, 20]} position={[10, 3, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
    </>
  )
}

function Gym3DScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Gym structure */}
      <GymFloor />
      <GymWalls />

      {/* Equipment */}
      <Dumbbell position={[-3, 0, 2]} />
      <Dumbbell position={[-2, 0, 2]} />
      <Treadmill position={[3, 0, 0]} />
      <WeightRack position={[0, 0, -3]} />

      {/* Welcome text */}
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/helvetiker_regular.typeface.json"
      >
        🏋️‍♀️ Welcome to Sujata Gym
      </Text>

      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        Interactive 3D Experience
      </Text>

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default function Gym3DCanvas() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Gym3DScene />
        </Suspense>
      </Canvas>
    </div>
  )
}