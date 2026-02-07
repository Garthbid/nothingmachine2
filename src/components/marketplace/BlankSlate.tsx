'use client'

import { useEffect, useRef } from 'react'

export function BlankSlate() {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null)
  const haloCanvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<number[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const glyphsRef = useRef<any[]>([])

  // Binary Rain Effect
  useEffect(() => {
    const canvas = rainCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const FONT_SIZE = 14

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(window.innerWidth / FONT_SIZE)
      dropsRef.current = Array.from({ length: columns }, () => Math.random() * -100)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.font = `300 ${FONT_SIZE}px 'IBM Plex Mono', monospace`

      for (let i = 0; i < dropsRef.current.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0'
        const x = i * FONT_SIZE
        const y = dropsRef.current[i] * FONT_SIZE

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.985) {
          dropsRef.current[i] = 0
        }
        dropsRef.current[i] += 0.4 + Math.random() * 0.2
      }
    }

    const interval = setInterval(draw, 60)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Orbital Halo Effect
  useEffect(() => {
    const canvas = haloCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = window.devicePixelRatio || 1
    let HALO_SIZE = 440
    const CHARS = '01'

    class Glyph {
      ring: number
      baseRadius: number
      radiusJitter: number
      angle: number
      speed: number
      char: string
      baseOpacity: number
      flickerSpeed: number
      flickerOffset: number
      fontSize: number
      driftPhase: number
      driftAmp: number
      swapInterval: number
      lastSwap: number
      currentRadius: number
      opacity: number

      constructor(ring: number, size: number) {
        this.ring = ring
        const scale = size / 440
        const baseRadius = [72, 115, 170][ring] * scale
        this.baseRadius = baseRadius
        this.radiusJitter = (Math.random() - 0.5) * 18 * scale
        this.angle = Math.random() * Math.PI * 2
        this.speed = (0.00025 + Math.random() * 0.0004) * (ring === 0 ? 1.7 : ring === 1 ? 1 : 0.55)
        this.speed *= Math.random() > 0.5 ? 1 : -1
        this.char = CHARS[Math.floor(Math.random() * 2)]
        this.baseOpacity = [0.55, 0.3, 0.14][ring]
        this.flickerSpeed = 0.0008 + Math.random() * 0.003
        this.flickerOffset = Math.random() * Math.PI * 2
        this.fontSize = [13, 11, 9][ring]
        this.driftPhase = Math.random() * Math.PI * 2
        this.driftAmp = (2 + Math.random() * 5) * scale
        this.swapInterval = 3000 + Math.random() * 9000
        this.lastSwap = 0
        this.currentRadius = baseRadius
        this.opacity = this.baseOpacity
      }

      update(time: number) {
        this.angle += this.speed
        const breathe = Math.sin(time * 0.0007 + this.driftPhase) * this.driftAmp
        this.currentRadius = this.baseRadius + this.radiusJitter + breathe

        const flicker = Math.sin(time * this.flickerSpeed + this.flickerOffset)
        this.opacity = this.baseOpacity * (0.45 + 0.55 * flicker)

        const globalPulse = Math.sin(time * 0.0004) * 0.25 + 0.75
        this.opacity *= globalPulse

        if (time - this.lastSwap > this.swapInterval) {
          this.char = CHARS[Math.floor(Math.random() * 2)]
          this.lastSwap = time
          this.swapInterval = 3000 + Math.random() * 9000
        }
      }

      draw(ctx: CanvasRenderingContext2D, center: number) {
        const x = center + Math.cos(this.angle) * this.currentRadius
        const y = center + Math.sin(this.angle) * this.currentRadius
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.font = `300 ${this.fontSize}px 'IBM Plex Mono', monospace`
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.char, x, y)
        ctx.restore()
      }
    }

    const resize = () => {
      const wrap = canvas.parentElement
      if (!wrap) return
      HALO_SIZE = wrap.clientWidth
      canvas.width = HALO_SIZE * DPR
      canvas.height = HALO_SIZE * DPR
      ctx.scale(DPR, DPR)
    }
    resize()

    // Initialize glyphs
    const counts = [22, 34, 52]
    glyphsRef.current = []
    counts.forEach((count, ring) => {
      for (let i = 0; i < count; i++) {
        glyphsRef.current.push(new Glyph(ring, HALO_SIZE))
      }
    })

    const HCENTER = () => HALO_SIZE / 2

    const drawConnections = (time: number) => {
      const center = HCENTER()
      const globalPulse = Math.sin(time * 0.0004) * 0.25 + 0.75
      const glyphs = glyphsRef.current

      for (let i = 0; i < glyphs.length; i++) {
        for (let j = i + 1; j < glyphs.length; j++) {
          if (glyphs[i].ring === glyphs[j].ring) continue
          const a = glyphs[i], b = glyphs[j]
          const ax = center + Math.cos(a.angle) * a.currentRadius
          const ay = center + Math.sin(a.angle) * a.currentRadius
          const bx = center + Math.cos(b.angle) * b.currentRadius
          const by = center + Math.sin(b.angle) * b.currentRadius
          const dist = Math.hypot(ax - bx, ay - by)

          if (dist < 45) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 45) * 0.055 * globalPulse
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const drawAura = (time: number) => {
      const center = HCENTER()
      const pulse = Math.sin(time * 0.0005) * 0.3 + 0.7
      const grad = ctx.createRadialGradient(center, center, 50, center, center, HALO_SIZE * 0.45)
      grad.addColorStop(0, `rgba(255,255,255,${0.018 * pulse})`)
      grad.addColorStop(0.5, `rgba(255,255,255,${0.006 * pulse})`)
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, HALO_SIZE, HALO_SIZE)
    }

    let animationId: number

    const animate = (time: number) => {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      const center = HCENTER()
      drawAura(time)
      glyphsRef.current.forEach(g => g.update(time))
      drawConnections(time)
      glyphsRef.current.forEach(g => g.draw(ctx, center))

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
      `}</style>

      <div className="relative h-full overflow-hidden bg-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace" }}>
        {/* Binary Rain Canvas */}
        <canvas
          ref={rainCanvasRef}
          className="fixed inset-0 z-0 pointer-events-none"
        />

        {/* Hero Section */}
        <section className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Orb with Halo */}
          <div className="relative w-[380px] h-[380px] max-w-[80vw] max-h-[40vh] flex items-center justify-center mb-10">
            <canvas
              ref={haloCanvasRef}
              className="absolute inset-0 w-full h-full"
            />
            <div
              className="relative z-10 w-[90px] h-[90px] bg-white rounded-full"
              style={{
                boxShadow: '0 0 50px rgba(255,255,255,0.12), 0 0 100px rgba(255,255,255,0.04)'
              }}
            />
          </div>

          {/* Title */}
          <h1
            className="text-[clamp(28px,4.5vw,48px)] font-medium tracking-[-0.02em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            Nothing Machine
          </h1>

          {/* Subtitle */}
          <p
            className="text-[clamp(12px,1.4vw,15px)] font-light text-white/35 leading-relaxed mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          >
            The answer to AGI is not more intelligence.
          </p>

          {/* Accent */}
          <p
            className="text-[clamp(14px,1.8vw,20px)] font-normal tracking-[0.01em] animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ animationDelay: '0.65s', animationFillMode: 'backwards' }}
          >
            It's identity.
          </p>
        </section>
      </div>
    </>
  )
}
