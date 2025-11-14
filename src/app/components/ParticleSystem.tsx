'use client'

import React, { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  lifetime: number
  color?: string
}

interface ParticleSystemProps {
  type: 'sparkles' | 'bubbles' | 'stars'
  count?: number
  duration?: number
  isActive?: boolean
  area?: { width: number; height: number }
}

export default function ParticleSystem({
  type,
  count = 20,
  duration = 5000,
  isActive = true,
  area = { width: 100, height: 100 }
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const generateParticles = () => {
      const colors = {
        sparkles: ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98'],
        bubbles: ['rgba(255,255,255,0.6)', 'rgba(173,216,230,0.5)', 'rgba(135,206,235,0.4)'],
        stars: ['#FFFFFF', '#FFFACD', '#F0E68C', '#FFE4B5', '#FFDAB9']
      }

      return Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * area.width,
        y: Math.random() * area.height,
        size: type === 'bubbles' ? 10 + Math.random() * 20 : 3 + Math.random() * 7,
        speed: type === 'bubbles' ? 0.5 + Math.random() * 1 : 0.3 + Math.random() * 0.7,
        opacity: 0.4 + Math.random() * 0.6,
        lifetime: 3000 + Math.random() * 2000,
        color: colors[type][Math.floor(Math.random() * colors[type].length)]
      }))
    }

    setParticles(generateParticles())

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + (Math.random() - 0.5) * 0.5,
          opacity: particle.opacity * 0.995
        })).filter(particle => particle.y > -10 && particle.opacity > 0.1)

        if (updated.length < count * 0.7) {
          return [...updated, ...generateParticles().slice(0, count - updated.length)]
        }
        return updated
      })
    }, 50)

    return () => clearInterval(interval)
  }, [type, count, area, isActive])

  const renderParticle = (particle: Particle) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      pointerEvents: 'none',
      transition: 'all 0.05s linear',
    }

    switch (type) {
      case 'sparkles':
        return (
          <div
            key={particle.id}
            className="sparkle"
            style={{
              ...baseStyle,
              color: particle.color,
              fontSize: `${particle.size}px`,
              filter: `drop-shadow(0 0 ${particle.size/2}px ${particle.color})`,
            }}
          >
            ✨
          </div>
        )

      case 'bubbles':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              backgroundColor: particle.color,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: `0 0 ${particle.size/2}px rgba(255,255,255,0.4)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        )

      case 'stars':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              color: particle.color,
              fontSize: `${particle.size}px`,
              textShadow: `0 0 ${particle.size}px ${particle.color}`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          >
            ⭐
          </div>
        )

      default:
        return null
    }
  }

  if (!isActive) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ width: `${area.width}%`, height: `${area.height}%` }}
    >
      {particles.map(particle => renderParticle(particle))}
    </div>
  )
}