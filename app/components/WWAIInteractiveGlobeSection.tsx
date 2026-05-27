'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type PointerState = {
  active: boolean
  x: number
  y: number
  vx: number
  vy: number
  lastInteraction: number
}

const clientNodes = [
  new THREE.Vector3(-1.25, 0.72, 1.66),
  new THREE.Vector3(1.44, -0.48, 1.42),
]

function pointOnSphere(index: number, total: number, radius: number) {
  const offset = 2 / total
  const increment = Math.PI * (3 - Math.sqrt(5))
  const y = index * offset - 1 + offset / 2
  const r = Math.sqrt(1 - y * y)
  const phi = index * increment

  return new THREE.Vector3(
    Math.cos(phi) * r * radius,
    y * radius,
    Math.sin(phi) * r * radius
  )
}

export default function WWAIInteractiveGlobeSection() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 7.35)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    mount.appendChild(renderer.domElement)

    const globe = new THREE.Group()
    globe.scale.setScalar(0.9)
    scene.add(globe)

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 56, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff50,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
      })
    )
    globe.add(sphere)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(2.24, 56, 32),
      new THREE.MeshBasicMaterial({
        color: 0xb6ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.045,
        blending: THREE.AdditiveBlending,
      })
    )
    halo.scale.setScalar(1.035)
    globe.add(halo)

    const passivePositions: number[] = []
    for (let i = 0; i < 88; i += 1) {
      const p = pointOnSphere(i, 88, 2.22)
      passivePositions.push(p.x, p.y, p.z)
    }

    const passiveGeometry = new THREE.BufferGeometry()
    passiveGeometry.setAttribute('position', new THREE.Float32BufferAttribute(passivePositions, 3))
    const passivePoints = new THREE.Points(
      passiveGeometry,
      new THREE.PointsMaterial({
        color: 0x84ff28,
        size: 0.024,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    globe.add(passivePoints)

    const activeGeometry = new THREE.BufferGeometry().setFromPoints(clientNodes)
    const activePoints = new THREE.Points(
      activeGeometry,
      new THREE.PointsMaterial({
        color: 0xb6ff00,
        size: 0.13,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    globe.add(activePoints)

    const connectionGroup = new THREE.Group()
    const softLineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff50,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })

    for (let i = 0; i < 10; i += 1) {
      const a = pointOnSphere(i * 7, 88, 2.22)
      const b = pointOnSphere((i * 13 + 19) % 88, 88, 2.22)
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), softLineMaterial)
      connectionGroup.add(line)
    }

    const activeLineGeometry = new THREE.BufferGeometry().setFromPoints(clientNodes)
    const activeLineMaterial = new THREE.LineDashedMaterial({
      color: 0xb6ff00,
      transparent: true,
      opacity: 0.95,
      dashSize: 0.18,
      gapSize: 0.11,
      blending: THREE.AdditiveBlending,
    })
    const activeLine = new THREE.Line(activeLineGeometry, activeLineMaterial)
    activeLine.computeLineDistances()
    connectionGroup.add(activeLine)

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xb6ff00,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    connectionGroup.add(pulse)
    globe.add(connectionGroup)

    const nodeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xb6ff00,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    clientNodes.forEach((p) => {
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), nodeGlowMaterial.clone())
      glow.position.copy(p)
      globe.add(glow)
    })

    const state: PointerState = {
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      lastInteraction: 0,
    }

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }

    const onPointerDown = (event: PointerEvent) => {
      state.active = true
      state.x = event.clientX
      state.y = event.clientY
      state.vx = 0
      state.vy = 0
      state.lastInteraction = performance.now()
      renderer.domElement.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!state.active) return
      const dx = event.clientX - state.x
      const dy = event.clientY - state.y
      state.x = event.clientX
      state.y = event.clientY
      state.vx = dx * 0.006
      state.vy = dy * 0.004
      globe.rotation.y += state.vx
      globe.rotation.x += state.vy
      globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x, -0.8, 0.8)
      state.lastInteraction = performance.now()
    }

    const onPointerUp = (event: PointerEvent) => {
      state.active = false
      state.lastInteraction = performance.now()
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId)
      }
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('resize', resize)
    resize()

    let raf = 0
    let visible = true
    const clock = new THREE.Clock()

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return

      const elapsed = clock.getElapsedTime()
      const idle = performance.now() - state.lastInteraction > 500
      if (!state.active && idle) globe.rotation.y += 0.0025

      state.vx *= 0.92
      state.vy *= 0.92
      if (!state.active && !idle) {
        globe.rotation.y += state.vx
        globe.rotation.x += state.vy
      }

      halo.rotation.y -= 0.0016
      passivePoints.rotation.y += 0.0007
      ;(activeLineMaterial as THREE.LineDashedMaterial & { dashOffset: number }).dashOffset = -elapsed * 0.48

      const t = (Math.sin(elapsed * 1.35) + 1) / 2
      pulse.position.lerpVectors(clientNodes[0], clientNodes[1], t)
      const pulseScale = 1 + Math.sin(elapsed * 5) * 0.22
      pulse.scale.setScalar(pulseScale)

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(mount)

    const onVisibilityChange = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', resize)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      renderer.domElement.removeEventListener('pointercancel', onPointerUp)
      mount.removeChild(renderer.domElement)
      scene.traverse((object) => {
        const disposable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry
          material?: THREE.Material | THREE.Material[]
        }
        disposable.geometry?.dispose()
        if (Array.isArray(disposable.material)) disposable.material.forEach((item) => item.dispose())
        else disposable.material?.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <section id="ecossistema" className="wwai-globe-section">
      <div className="container wwai-globe-inner">
        <div className="wwai-globe-copy fade-up">
          <p className="section-label">
            COMUNIDADE WWAI <span aria-hidden="true">&#9889;</span>
          </p>
          <h2 className="section-headline">
            Cada empresa conectada fortalece o ecossistema WWAI
          </h2>
          <p className="section-sub">
            A WWAI conecta empresas através da Inteligência Artificial. Cada novo cliente
            representa uma nova conexão dentro de uma rede viva de automação, performance e
            inovação.
          </p>
          <p className="wwai-globe-count">2 empresas já conectadas</p>
        </div>

        <div className="wwai-globe-stage fade-up stagger-2" aria-label="Globo 3D interativo da comunidade WWAI">
          <div className="wwai-globe-canvas" ref={mountRef} />
        </div>
      </div>
    </section>
  )
}
