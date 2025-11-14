'use client'

import React, { useState } from 'react'

interface CharacterProps {
  type: 'bunny' | 'bear' | 'fox' | 'lion' | 'frog' | 'unicorn' | 'panda' | 'butterfly'
  size?: number
  animation?: 'dance' | 'bounce' | 'float'
  onClick?: () => void
  className?: string
}

export default function Character({ type, size = 120, animation = 'dance', onClick, className = '' }: CharacterProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCharacterEmoji = () => {
    switch (type) {
      case 'bunny': return '🐰'
      case 'bear': return '🐻'
      case 'fox': return '🦊'
      case 'lion': return '🦁'
      case 'frog': return '🐸'
      case 'unicorn': return '🦄'
      case 'panda': return '🐼'
      case 'butterfly': return '🦋'
      default: return '🐻'
    }
  }

  const getCharacterColors = () => {
    switch (type) {
      case 'bunny': return { primary: '#FFB6C1', secondary: '#FFC0CB', glow: '#FF69B4' }
      case 'bear': return { primary: '#8B4513', secondary: '#D2691E', glow: '#A0522D' }
      case 'fox': return { primary: '#FF6347', secondary: '#FF4500', glow: '#FF8C00' }
      case 'lion': return { primary: '#FFD700', secondary: '#FFA500', glow: '#FF8C00' }
      case 'frog': return { primary: '#32CD32', secondary: '#90EE90', glow: '#00FF00' }
      case 'unicorn': return { primary: '#FF69B4', secondary: '#DA70D6', glow: '#FFB6C1' }
      case 'panda': return { primary: '#2F4F4F', secondary: '#696969', glow: '#708090' }
      case 'butterfly': return { primary: '#87CEEB', secondary: '#00BFFF', glow: '#1E90FF' }
      default: return { primary: '#8B4513', secondary: '#D2691E', glow: '#A0522D' }
    }
  }

  const colors = getCharacterColors()
  const emoji = getCharacterEmoji()

  const getAnimationClass = () => {
    switch (animation) {
      case 'dance': return 'character-dance'
      case 'bounce': return 'character-bounce'
      case 'float': return 'floating-slow'
      default: return 'character-dance'
    }
  }

  return (
    <div
      className={`clickable-3d ${getAnimationClass()} ${className}`}
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        filter: `drop-shadow(0 0 ${size/4}px ${colors.glow})`,
        transform: isHovered ? `scale(1.1) rotateZ(${Math.random() * 10 - 5}deg)` : 'scale(1) rotateZ(0deg)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        display: 'inline-block',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Character Body */}
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle at 30% 30%, ${colors.primary}, ${colors.secondary})`,
          borderRadius: type === 'butterfly' ? '50%' : '45%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Main Emoji */}
        <span
          className="select-none"
          style={{
            fontSize: `${size * 0.7}px`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            transform: `rotateZ(${type === 'butterfly' ? '45deg' : '0deg'})`,
          }}
        >
          {emoji}
        </span>

        {/* Special Effects for Different Characters */}
        {type === 'bunny' && (
          <>
            <div
              className="absolute"
              style={{
                top: '10%',
                left: '25%',
                width: '15%',
                height: '25%',
                background: colors.primary,
                borderRadius: '50%',
                transform: 'rotateZ(-20deg)',
              }}
            />
            <div
              className="absolute"
              style={{
                top: '10%',
                right: '25%',
                width: '15%',
                height: '25%',
                background: colors.primary,
                borderRadius: '50%',
                transform: 'rotateZ(20deg)',
              }}
            />
          </>
        )}

        {type === 'unicorn' && (
          <div
            className="absolute"
            style={{
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: `30px solid ${colors.glow}`,
              filter: 'drop-shadow(0 0 10px gold)',
            }}
          />
        )}

        {type === 'butterfly' && (
          <>
            <div
              className="absolute character-dance"
              style={{
                top: '40%',
                left: '-30%',
                width: '60%',
                height: '30%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: '50%',
                transformOrigin: 'right center',
              }}
            />
            <div
              className="absolute character-dance"
              style={{
                top: '40%',
                right: '-30%',
                width: '60%',
                height: '30%',
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                borderRadius: '50%',
                transformOrigin: 'left center',
                animationDelay: '0.1s',
              }}
            />
          </>
        )}

        {type === 'lion' && (
          <div
            className="absolute"
            style={{
              top: '-10%',
              left: '-10%',
              right: '-10%',
              bottom: '20%',
              background: `radial-gradient(circle, ${colors.glow}88, transparent)`,
              borderRadius: '50%',
              border: `3px solid ${colors.primary}`,
            }}
          />
        )}
      </div>

      {/* Hover Sparkles */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="sparkle absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                fontSize: `${size * 0.15}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              ✨
            </div>
          ))}
        </>
      )}
    </div>
  )
}