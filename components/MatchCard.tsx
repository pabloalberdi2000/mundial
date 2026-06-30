'use client'

import { Match, Prediction } from '@/lib/types'
import { useState, useEffect } from 'react'

interface MatchCardProps {
  match: Match
  prediction?: Prediction
  onChange: (matchId: string, homeScore: number, awayScore: number) => void
}

export function MatchCard({ match, prediction, onChange }: MatchCardProps) {
  const [homeScore, setHomeScore] = useState<number | string>(prediction?.home_score !== undefined ? prediction.home_score : '')
  const [awayScore, setAwayScore] = useState<number | string>(prediction?.away_score !== undefined ? prediction.away_score : '')

  useEffect(() => {
    if (prediction) {
      const home = prediction.home_score !== undefined ? prediction.home_score : ''
      const away = prediction.away_score !== undefined ? prediction.away_score : ''
      setHomeScore(home)
      setAwayScore(away)
    }
  }, [prediction, match.id])

  const handleHomeScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10)
    setHomeScore(value)
    if (value !== '' && awayScore !== '') {
      onChange(match.id, value, awayScore as number)
    }
  }

  const handleAwayScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10)
    setAwayScore(value)
    if (homeScore !== '' && value !== '') {
      onChange(match.id, homeScore as number, value)
    }
  }

  const matchDate = new Date(match.matchDate).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{match.phase}</p>
          <p className="text-xs text-gray-500">{matchDate}</p>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="text-4xl">{match.homeFlag}</span>
            <p className="text-sm font-semibold text-gray-800 text-center line-clamp-2">{match.homeTeam}</p>
            <input
              type="number"
              min="0"
              max="99"
              value={homeScore}
              onChange={handleHomeScoreChange}
              placeholder="-"
              className="w-16 h-16 text-center text-2xl font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 font-light">vs</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="text-4xl">{match.awayFlag}</span>
            <p className="text-sm font-semibold text-gray-800 text-center line-clamp-2">{match.awayTeam}</p>
            <input
              type="number"
              min="0"
              max="99"
              value={awayScore}
              onChange={handleAwayScoreChange}
              placeholder="-"
              className="w-16 h-16 text-center text-2xl font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
        </div>
      </div>

      {/* Footer - Status */}
      {homeScore !== '' && awayScore !== '' && (
        <div className="bg-green-50 px-4 py-2 border-t border-green-200 text-center">
          <p className="text-xs font-semibold text-green-700">✓ Predicción registrada</p>
        </div>
      )}
    </div>
  )
}
