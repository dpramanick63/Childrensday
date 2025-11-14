'use client'

import React, { useState } from 'react'
import GameCard from './components/GameCard'
import Character from './components/Character'
import CartoonViewer from './components/CartoonViewer'
import MemoryGame from './components/MemoryGame'
import ParticleSystem from './components/ParticleSystem'

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<'bunny' | 'bear' | 'fox' | 'lion' | 'frog' | 'unicorn' | 'panda' | 'butterfly' | null>(null)
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  const characters: Array<'bunny' | 'bear' | 'fox' | 'lion' | 'frog' | 'unicorn' | 'panda' | 'butterfly'> = [
    'bunny', 'bear', 'fox', 'lion', 'frog', 'unicorn', 'panda', 'butterfly'
  ]

  const games = [
    {
      id: 'memory-match',
      title: 'Memory Match 3D',
      description: 'Match magical shapes in this 3D memory game!',
      icon: '🧩',
      color: '#FF6B6B'
    },
    {
      id: 'coming-soon-1',
      title: 'Bubble Pop Adventure',
      description: 'Pop colorful bubbles in this magical adventure!',
      icon: '🫧',
      color: '#4ECDC4'
    },
    {
      id: 'coming-soon-2',
      title: 'Star Catcher',
      description: 'Catch falling stars and make wishes come true!',
      icon: '⭐',
      color: '#FECA57'
    }
  ]

  const launchGame = (gameId: string) => {
    if (gameId === 'memory-match') {
      setCurrentGame(gameId)
    }
  }

  const closeGame = () => {
    setCurrentGame(null)
  }

  if (currentGame === 'memory-match') {
    return <MemoryGame />
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Particle Effects */}
      <ParticleSystem type="sparkles" count={25} area={{ width: 100, height: 100 }} />
      <ParticleSystem type="bubbles" count={15} area={{ width: 100, height: 100 }} />

      {/* Floating Header Section */}
      <header className="relative z-10 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="float-3d glass rounded-3xl p-12 mb-8 glow-border">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 glow-text floating" style={{
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FECA57, #FF9FF3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎉 Happy Children's Day! 🎉
            </h1>
            <p className="text-xl md:text-2xl opacity-90 pulse floating-delayed">
              Welcome to the magical world of fun and games!
            </p>
          </div>

          {/* Floating Emojis */}
          <div className="relative h-32 mb-8">
            <div className="absolute top-0 left-1/4 text-5xl floating character-bounce">🎈</div>
            <div className="absolute top-4 right-1/4 text-5xl floating-delayed bounce">🎊</div>
            <div className="absolute top-8 left-1/3 text-5xl character-dance">🦄</div>
            <div className="absolute top-2 right-1/3 text-5xl bounce-slow">🌈</div>
            <div className="absolute top-12 left-1/2 text-5xl floating">⭐</div>
          </div>
        </div>
      </header>

      {/* Games Zone Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 fade-in-up glow-text" style={{ color: '#5F27CD' }}>
            🎮 Games Zone 🎮
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                icon={game.icon}
                color={game.color}
                delay={index}
                onClick={() => launchGame(game.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cartoon Theater Section */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 fade-in-up glow-text" style={{ color: '#FF9FF3' }}>
            🎭 Cartoon Theater 🎭
          </h2>

          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            {/* Stage Background */}
            <div
              className="absolute inset-0 opacity-10 rounded-3xl"
              style={{
                background: 'radial-gradient(circle at center, #FF9FF3 0%, transparent 70%)',
                animation: 'rotateYSlow 15s linear infinite',
              }}
            />

            {/* Characters Grid */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {characters.map((character, index) => (
                <div key={character} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Character
                    type={character}
                    size={100}
                    animation="bounce"
                    onClick={() => setSelectedCharacter(character)}
                  />
                  <p className="text-center mt-2 font-semibold capitalize opacity-80">
                    {character}
                  </p>
                </div>
              ))}
            </div>

            {/* Stage Instructions */}
            <div className="text-center mt-8 fade-in-up" style={{ animationDelay: '1s' }}>
              <p className="text-lg opacity-90 pulse">
                👆 Click on any character to watch them perform!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4">
        <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 glow-text" style={{ color: '#FFD700' }}>
            🌟 Made with Love for All Children! 🌟
          </h3>
          <p className="opacity-80">
            Hope you have an amazing Children's Day filled with joy, laughter, and magical moments!
          </p>
          <div className="mt-4 text-3xl">
            <span className="inline-block mx-2 bounce">🎁</span>
            <span className="inline-block mx-2 floating">🎈</span>
            <span className="inline-block mx-2 character-dance">🎉</span>
            <span className="inline-block mx-2 bounce-slow">🧸</span>
          </div>
        </div>
      </footer>

      {/* CartoonViewer Modal */}
      <CartoonViewer
        isOpen={selectedCharacter !== null}
        onClose={() => setSelectedCharacter(null)}
        characterType={selectedCharacter || 'bunny'}
      />
    </div>
  )
}
