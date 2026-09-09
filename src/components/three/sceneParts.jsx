import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Creates a soft radial-gradient texture used for the moon's halo glow.
 */
function createGlowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  )
  g.addColorStop(0, 'rgba(255, 240, 214, 1)')
  g.addColorStop(0.25, 'rgba(255, 236, 205, 0.45)')
  g.addColorStop(0.6, 'rgba(255, 230, 195, 0.12)')
  g.addColorStop(1, 'rgba(255, 230, 195, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

/**
 * The glowing moon: a pale sphere wrapped in a billboard halo glow.
 */
export function Moon({ position = [7, 3.4, -6] }) {
  const glowRef = useRef()
  const texture = useMemo(() => createGlowTexture(), [])
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const s = 5.6 + Math.sin(clock.elapsedTime * 0.5) * 0.14
      glowRef.current.scale.set(s, s, 1)
    }
  })

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color="#fff4dd"
          roughness={0.92}
          metalness={0}
        />
      </mesh>
      <sprite ref={glowRef} scale={[5.6, 5.6, 1]} renderOrder={-1}>
        <spriteMaterial
          map={texture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}

/**
 * A dusk-hazed city skyline built with hardware-instanced boxes.
 */
export function City({ count = 64, width = 46, seed = 1 }) {
  // Deterministic pseudo-random from seed so layout is stable.
  const data = useMemo(() => {
    let s = seed
    const rand = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    const arr = []
    for (let i = 0; i < count; i++) {
      const w = 0.7 + rand() * 1.7
      const h = 1.2 + Math.pow(rand(), 2.2) * 9
      const d = 1.5 + rand() * 2.2
      arr.push({
        pos: [-width / 2 + rand() * width, h / 2, -6 - rand() * 10],
        scale: [w, h, d],
      })
    }
    return arr
  }, [count, width, seed])

  return (
    <group position={[0, -0.55, 0]}>
      <Instances range={data.length} limit={data.length}>
        <boxGeometry />
        <meshStandardMaterial color="#16191f" roughness={0.92} metalness={0} />
        {data.map((b, i) => (
          <Instance key={i} position={b.pos} scale={b.scale} />
        ))}
      </Instances>
    </group>
  )
}

/**
 * CityLights — thousands of tiny warm window lights scattered across the
 * skyline. A single additive points buffer, twinkling very slowly, so it stays
 * essentially free on the GPU.
 */
export function CityLights({ count = 220, width = 46 }) {
  const pointsRef = useRef()
  const materialRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    /* eslint-disable react-hooks/purity */
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * width
      arr[i * 3 + 1] = 0.4 + Math.pow(Math.random(), 1.4) * 7.2
      arr[i * 3 + 2] = -6 - Math.random() * 9
    }
    /* eslint-enable react-hooks/purity */
    return arr
  }, [count, width])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.62 + Math.sin(clock.elapsedTime * 0.7) * 0.12
    }
    if (pointsRef.current) {
      pointsRef.current.position.y = -0.55
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.09}
        color="#ffcf8a"
        transparent
        opacity={0.62}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * A fine layer of floating dust glints across the night sky.
 */
export function Dust({ count = 420, spread = [26, 12, 18] }) {
  // Positions are randomized once into an immutable buffer and memoized, so
  // the result is stable across renders. This is intentional one-time data.
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    /* eslint-disable react-hooks/purity */
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * spread[0]
      arr[i + 1] = (Math.random() - 0.5) * spread[1] + 2
      arr[i + 2] = (Math.random() - 0.5) * spread[2] - 4
    }
    /* eslint-enable react-hooks/purity */
    return arr
  }, [count, spread])

  const pointsRef = useRef()

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f6e7c4"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}