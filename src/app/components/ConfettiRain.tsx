'use client'

import React, { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  animationDuration: number
  delay: number
  size: number
  color: string
  shape: 'square' | 'circle' | 'triangle' | 'star'
}

interface ConfettiRainProps {
  isActive: boolean
  duration?: number
}

export default function ConfettiRain({ isActive, duration = 3000 }: ConfettiRainProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (isActive) {
      const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#48dbfb',
        '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
        '#10ac84', '#ee5a24', '#f368e0', '#ff6348', '#00b894'
      ]

      const shapes: Array<'square' | 'circle' | 'triangle' | 'star'> = ['square', 'circle', 'triangle', 'star']

      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        size: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }))

      setConfettiPieces(pieces)

      const timer = setTimeout(() => {
        setConfettiPieces([])
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isActive, duration])

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${piece.left}%`,
      top: '-20px',
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      backgroundColor: piece.color,
      animation: `confettiFall ${piece.animationDuration}s ease-in-out ${piece.delay}s forwards`,
      zIndex: 1000,
    }

    switch (piece.shape) {
      case 'circle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
            }}
          />
        )

      case 'triangle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${piece.size/2}px solid transparent`,
              borderRight: `${piece.size/2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        )

      case 'star':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              backgroundColor: 'transparent',
            }}
          >
            <svg
              width={piece.size}
              height={piece.size}
              viewBox="0 0 50 50"
              fill={piece.color}
            >
              <path d="M25,1 L31,17 L48,17 L34,28 L40,44 L25,33 L10,44 L16,28 L2,17 L19,17 Z" />
            </svg>
          </div>
        )

      default: // square
        return <div key={piece.id} style={baseStyle} />
    }
  }

  if (!isActive || confettiPieces.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map(piece => renderShape(piece))}
    </div>
  )
}