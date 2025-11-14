'use client'

import React from 'react'

interface Shape3DProps {
  type: 'cube' | 'sphere' | 'star' | 'pyramid' | 'heart' | 'diamond' | 'hexagon' | 'triangle'
  color: string
  size: number
  onClick?: () => void
  isFlipped?: boolean
  delay?: number
}

export default function Shape3D({ type, color, size, onClick, isFlipped = false, delay = 0 }: Shape3DProps) {
  const renderShape = () => {
    const baseStyle: React.CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      transformStyle: 'preserve-3d',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: onClick ? 'pointer' : 'default',
    }

    switch (type) {
      case 'cube':
        return (
          <div
            className={`card-3d ${isFlipped ? 'flipped' : ''}`}
            style={{ ...baseStyle, transform: `rotateY(${isFlipped ? '180deg' : '0deg'})` }}
            onClick={onClick}
          >
            <div className="card-face-front rounded-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
              <div className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                <div className="transform rotate-45">⟦⟧</div>
              </div>
            </div>
            <div className="card-face-back rounded-lg" style={{ background: `linear-gradient(135deg, #fff, #f0f0f0)` }}>
              <div className="w-full h-full rounded-lg flex items-center justify-center text-gray-400">
                <div className="text-4xl">?</div>
              </div>
            </div>
          </div>
        )

      case 'sphere':
        return (
          <div
            className="clickable-3d floating-slow rounded-full"
            style={{
              ...baseStyle,
              background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}88, ${color}44)`,
              boxShadow: `0 15px 35px ${color}44, inset -5px -5px 15px rgba(0,0,0,0.2)`,
            }}
            onClick={onClick}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white">
              <div className="text-3xl font-bold">⭕</div>
            </div>
          </div>
        )

      case 'star':
        return (
          <div
            className="clickable-3d floating"
            style={{
              ...baseStyle,
              background: 'transparent',
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
            onClick={onClick}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 100 100"
              fill={color}
              style={{ transform: 'rotateZ(-15deg)' }}
            >
              <path d="M50,5 L61,35 L95,35 L68,57 L79,87 L50,65 L21,87 L32,57 L5,35 L39,35 Z" />
            </svg>
          </div>
        )

      case 'pyramid':
        return (
          <div
            className="clickable-3d bounce-slow"
            style={{
              ...baseStyle,
              background: `linear-gradient(135deg, ${color} 0%, ${color}cc 50%, ${color}88 100%)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
            }}
            onClick={onClick}
          />
        )

      case 'heart':
        return (
          <div
            className="clickable-3d pulse"
            style={{
              ...baseStyle,
              background: 'transparent',
              filter: `drop-shadow(0 0 15px ${color})`,
            }}
            onClick={onClick}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 100 100"
              fill={color}
            >
              <path d="M50,25 C30,0 0,12.5 0,40 C0,60 50,95 50,95 C50,95 100,60 100,40 C100,12.5 70,0 50,25 Z" />
            </svg>
          </div>
        )

      case 'diamond':
        return (
          <div
            className="clickable-3d rotate-y-slow"
            style={{
              ...baseStyle,
              background: `linear-gradient(135deg, ${color}ff, ${color}cc, ${color}ff)`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              transform: `rotate(${isFlipped ? '180deg' : '0deg'})`,
            }}
            onClick={onClick}
          />
        )

      case 'hexagon':
        return (
          <div
            className="clickable-3d floating-delayed"
            style={{
              ...baseStyle,
              background: `linear-gradient(135deg, ${color}, ${color}aa)`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
            onClick={onClick}
          />
        )

      case 'triangle':
        return (
          <div
            className="clickable-3d character-dance"
            style={{
              ...baseStyle,
              background: `linear-gradient(135deg, ${color}, ${color}bb)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            onClick={onClick}
          />
        )

      default:
        return null
    }
  }

  return (
    <div
      className="fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        display: 'inline-block',
        margin: '8px',
      }}
    >
      {renderShape()}
    </div>
  )
}