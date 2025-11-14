'use client'

import React from 'react'

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay: number
  onClick: () => void
}

export default function GameCard({ title, description, icon, color, delay, onClick }: GameCardProps) {
  return (
    <div
      className={`fade-in-up stagger-${delay + 1} float-3d glass rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${color}`}
      onClick={onClick}
      style={{
        animationDelay: `${delay * 0.1}s`,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        border: `2px solid ${color}66`,
        boxShadow: `0 10px 30px -10px ${color}44`,
      }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4 bounce character-bounce">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3 glow-text" style={{ color }}>
          {title}
        </h3>
        <p className="text-sm opacity-90 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Sparkle particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  )
}