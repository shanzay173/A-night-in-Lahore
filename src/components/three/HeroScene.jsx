import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Moon, City, CityLights, Dust } from './sceneParts'

/**
 * Rig
 * Parallax camera that eases toward the pointer, then settles a slow drift.
 */
function Rig() {
  const lookRef = useRef([0, 1.15, 0])
  const { camera, pointer } = useThree()

  // React three fiber's `useFrame` runs outside React's render cycle, so
  // mutating the camera here is the supported imperative animation API.
  // The following disable is scoped to this imperative block only.
  // eslint-disable-next-line react-hooks/immutability
  useFrame(() => {
    const driftX = Math.sin(Date.now() * 0.0002) * 0.22
    const targetX = pointer.x * 0.9 + driftX
    const targetY = 1.35 + pointer.y * 0.45
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(lookRef.current[0], lookRef.current[1], lookRef.current[2])
  })
  return null
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#e8c98b" />
      <directionalLight position={[6, 4, -4]} intensity={0.9} color="#ffd9a0" />
      <pointLight position={[7, 3.2, -6]} intensity={1.4} color="#ffd9a0" distance={14} />
      <pointLight position={[-6, 0.5, -5]} intensity={0.5} color="#2a4860" distance={16} />

      <Moon />
      <City />
      <CityLights />
      <Dust />
      <Rig />
      <fog attach="fog" args={['#0a0b0e', 6, 20]} />
    </>
  )
}

/**
 * HeroScene
 * Full-bleed WebGL night scene — a drowsy skyline, warm window lights, a moon,
 * and drifting dust. Mounts only when the device supports WebGL and the screen
 * isn't tiny; otherwise the hero falls back to a gradient + image.
 */
export default function HeroScene() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.4, 9], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}