'use client'

import React, { useState, useEffect } from 'react'
import Shape3D from './Shape3D'
import ConfettiRain from './ConfettiRain'

interface Card {
  id: number
  type: 'cube' | 'sphere' | 'star' | 'pyramid' | 'heart' | 'diamond' | 'hexagon' | 'triangle'
  color: string
  isFlipped: boolean
  isMatched: boolean
}

const SHAPES: Array<'cube' | 'sphere' | 'star' | 'pyramid' | 'heart' | 'diamond' | 'hexagon' | 'triangle'> = [
  'cube', 'sphere', 'star', 'pyramid', 'heart', 'diamond', 'hexagon', 'triangle'
]

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3'
]

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isGameWon, setIsGameWon] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && startTime && !isGameWon) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, startTime, isGameWon])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find(card => card.id === first)
      const secondCard = cards.find(card => card.id === second)

      if (firstCard && secondCard && firstCard.type === secondCard.type) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          )
          setMatches(prev => {
            const newMatches = prev + 1
            if (newMatches === 8) {
              setIsGameWon(true)
              setShowConfetti(true)
              setTimeout(() => setShowConfetti(false), 5000)
            }
            return newMatches
          })
          setFlippedCards([])
        }, 600)
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  const initializeGame = () => {
    const gameCards: Card[] = []
    let id = 0

    SHAPES.forEach((shape, shapeIndex) => {
      for (let i = 0; i < 2; i++) {
        gameCards.push({
          id: id++,
          type: shape,
          color: COLORS[shapeIndex],
          isFlipped: false,
          isMatched: false
        })
      }
    })

    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setIsGameWon(false)
    setGameStarted(false)
    setStartTime(null)
    setElapsedTime(0)
    setShowConfetti(false)
  }

  const handleCardClick = (cardId: number) => {
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) return

    if (!gameStarted) {
      setGameStarted(true)
      setStartTime(Date.now())
    }

    setCards(prev =>
      prev.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    )
    setFlippedCards(prev => [...prev, cardId])
    setMoves(prev => prev + 1)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen gradient-bg-alt p-8">
      <ConfettiRain isActive={showConfetti} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-5xl font-bold mb-4 glow-text" style={{ color: '#5F27CD' }}>
            Memory Match 3D
          </h1>
          <p className="text-xl opacity-90">
            Match the magical shapes to win!
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="glass rounded-2xl px-6 py-3 text-center">
            <p className="text-sm opacity-75">Moves</p>
            <p className="text-2xl font-bold" style={{ color: '#FF6B6B' }}>{moves}</p>
          </div>
          <div className="glass rounded-2xl px-6 py-3 text-center">
            <p className="text-sm opacity-75">Matches</p>
            <p className="text-2xl font-bold" style={{ color: '#4ECDC4' }}>{matches}/8</p>
          </div>
          <div className="glass rounded-2xl px-6 py-3 text-center">
            <p className="text-sm opacity-75">Time</p>
            <p className="text-2xl font-bold" style={{ color: '#FECA57' }}>{formatTime(elapsedTime)}</p>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Shape3D
                type={card.type}
                color={card.color}
                size={80}
                isFlipped={card.isFlipped || card.isMatched}
                onClick={() => handleCardClick(card.id)}
                delay={index * 0.05}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={initializeGame}
            className="glass rounded-full px-8 py-4 text-lg font-bold clickable-3d"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B22 0%, #4ECDC444 100%)',
              border: '2px solid #FF6B6B66',
              color: '#5F27CD'
            }}
          >
            🔄 New Game
          </button>
        </div>

        {/* Win Modal */}
        {isGameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass rounded-3xl p-8 max-w-md text-center bounce">
              <h2 className="text-4xl font-bold mb-4 glow-text" style={{ color: '#FFD700' }}>
                🎉 You Won! 🎉
              </h2>
              <div className="mb-6 space-y-2">
                <p className="text-xl">Completed in {moves} moves</p>
                <p className="text-xl">Time: {formatTime(elapsedTime)}</p>
              </div>
              <button
                onClick={initializeGame}
                className="glass rounded-full px-6 py-3 font-bold clickable-3d"
                style={{
                  background: 'linear-gradient(135deg, #4ECDC422 0%, #45B7D144 100%)',
                  border: '2px solid #4ECDC466',
                  color: '#45B7D1'
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}