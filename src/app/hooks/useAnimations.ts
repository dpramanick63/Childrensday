'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold])

  return { isVisible, elementRef }
}

export function useFloatingAnimation(speed = 3, amplitude = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrame: number
    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const y = Math.sin(elapsed * (1 / speed)) * amplitude
      const x = Math.sin(elapsed * (1 / (speed * 1.5))) * (amplitude / 2)

      setPosition({ x, y })
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [speed, amplitude])

  return position
}

export function useParticleAnimation(count = 20) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
  }>>([])

  useEffect(() => {
    const initialParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.5 - 0.2,
      size: 3 + Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.6
    }))

    setParticles(initialParticles)
  }, [count])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx + 100) % 100,
          y: (particle.y + particle.vy + 100) % 100,
          opacity: particle.opacity * 0.995 > 0.1 ? particle.opacity * 0.995 : 0.6
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return particles
}

export function useStaggeredAnimation(itemCount: number, baseDelay = 100) {
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setAnimatedItems(prev => new Set([...prev, i]))
      }, i * baseDelay)

      timeouts.push(timeout)
    }

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [itemCount, baseDelay])

  return (index: number) => animatedItems.has(index)
}

export function useClickAnimation() {
  const [clickEffects, setClickEffects] = useState<Array<{
    id: number
    x: number
    y: number
    timestamp: number
  }>>([])

  const addClickEffect = (x: number, y: number) => {
    const id = Date.now()
    setClickEffects(prev => [...prev, { id, x, y, timestamp: Date.now() }])

    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== id))
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setClickEffects(prev =>
        prev.filter(effect => Date.now() - effect.timestamp < 1000)
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return { clickEffects, addClickEffect }
}