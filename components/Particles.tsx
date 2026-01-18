'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particleCount = 50
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 10}s`
      particle.style.animationDuration = `${10 + Math.random() * 20}s`
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(particle => particle.remove())
    }
  }, [])

  return <div ref={containerRef} className="particles" />
}
