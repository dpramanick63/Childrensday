'use client'

import React, { useState, useEffect } from 'react'
import Character from './Character'
import ParticleSystem from './ParticleSystem'

interface CartoonViewerProps {
  isOpen: boolean
  onClose: () => void
  characterType: 'bunny' | 'bear' | 'fox' | 'lion' | 'frog' | 'unicorn' | 'panda' | 'butterfly'
}

export default function CartoonViewer({ isOpen, onClose, characterType }: CartoonViewerProps) {
  const [mode, setMode] = useState<'animation' | 'interactive'>('animation')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      setMode('animation')
      setRotation(0)
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen, characterType])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'interactive') return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    const newRotation = (x / centerX) * 30
    const newScale = 1 + (Math.abs(y) / centerY) * 0.3

    setRotation(newRotation)
    setScale(newScale)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (mode !== 'interactive') return

    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const x = touch.clientX - rect.left - centerX

    const newRotation = (x / centerX) * 30
    setRotation(newRotation)
  }

  const resetView = () => {
    setRotation(0)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] glass rounded-3xl p-8 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 20% 50%, #FF6B6B 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4ECDC4 0%, transparent 50%)',
            animation: 'rotateYSlow 20s linear infinite',
          }}
        />

        {/* Particle Effects */}
        <ParticleSystem type="sparkles" count={15} area={{ width: 100, height: 100 }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl clickable-3d z-10 glass rounded-full w-12 h-12 flex items-center justify-center"
          style={{ color: '#FF6B6B' }}
        >
          ✕
        </button>

        {/* Mode Toggle */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <button
            onClick={() => setMode('animation')}
            className={`px-4 py-2 rounded-full clickable-3d glass transition-all ${
              mode === 'animation' ? 'scale-110' : 'scale-100 opacity-70'
            }`}
            style={{
              background: mode === 'animation'
                ? 'linear-gradient(135deg, #FF6B6B44 0%, #FF6B6B66 100%)'
                : 'transparent',
              border: `2px solid ${mode === 'animation' ? '#FF6B6B' : '#FF6B6B44'}`,
              color: mode === 'animation' ? '#FF6B6B' : '#666',
            }}
          >
            🎵 Watch Animation
          </button>
          <button
            onClick={() => setMode('interactive')}
            className={`px-4 py-2 rounded-full clickable-3d glass transition-all ${
              mode === 'interactive' ? 'scale-110' : 'scale-100 opacity-70'
            }`}
            style={{
              background: mode === 'interactive'
                ? 'linear-gradient(135deg, #4ECDC444 0%, #4ECDC466 100%)'
                : 'transparent',
              border: `2px solid ${mode === 'interactive' ? '#4ECDC4' : '#4ECDC444'}`,
              color: mode === 'interactive' ? '#4ECDC4' : '#666',
            }}
          >
            🎮 Play Interactive
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-col items-center justify-center h-full relative"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={mode === 'interactive' ? resetView : undefined}
        >
          {/* Mode Title */}
          <h2
            className="text-3xl font-bold mb-8 glow-text fade-in-up"
            style={{
              color: mode === 'animation' ? '#FF6B6B' : '#4ECDC4',
            }}
          >
            {mode === 'animation' ? '🎵 Watch the Magic Show!' : '🎮 Play with Me!'}
          </h2>

          {/* Character Display */}
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              transform: `
                translateX(${position.x}px)
                translateY(${position.y}px)
                rotateY(${rotation}deg)
                scale(${scale})
              `,
              cursor: mode === 'interactive' ? 'grab' : 'default',
            }}
          >
            <Character
              type={characterType}
              size={mode === 'interactive' ? 200 : 180}
              animation={mode === 'animation' ? 'dance' : 'float'}
              onClick={mode === 'interactive' ? undefined : () => {}}
            />

            {/* Mode-specific decorations */}
            {mode === 'animation' && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="text-4xl animate-bounce">🎵</div>
              </div>
            )}
          </div>

          {/* Interactive Mode Instructions */}
          {mode === 'interactive' && (
            <div className="mt-8 text-center fade-in-up">
              <p className="text-lg opacity-80 mb-2">
                🖱️ Move mouse to rotate character
              </p>
              <p className="text-lg opacity-80">
                📱 Touch and drag on mobile
              </p>
              <p className="text-sm opacity-60 mt-4">
                Click to reset position
              </p>
            </div>
          )}

          {/* Animation Mode Decorations */}
          {mode === 'animation' && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="text-2xl bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  🌟
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stage Lighting Effect */}
        <div
          className="absolute top-0 left-1/4 w-32 h-32 opacity-20 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FFD700, transparent)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-32 h-32 opacity-20 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF69B4, transparent)',
            animation: 'pulse 3s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
        />
      </div>
    </div>
  )
}