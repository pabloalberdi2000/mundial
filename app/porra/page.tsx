'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Match, Prediction } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'

const MOCK_MATCHES: Match[] = [
  {
    id: 'match-1',
    homeTeam: 'Argentina',
    awayTeam: 'Arabia Saudita',
    homeFlag: '🇦🇷',
    awayFlag: '🇸🇦',
    matchDate: '2026-06-21T18:00:00Z',
    phase: 'Fase de Grupos',
  },
  {
    id: 'match-2',
    homeTeam: 'México',
    awayTeam: 'Polonia',
    homeFlag: '🇲🇽',
    awayFlag: '🇵🇱',
    matchDate: '2026-06-22T21:00:00Z',
    phase: 'Fase de Grupos',
  },
  {
    id: 'match-3',
    homeTeam: 'Francia',
    awayTeam: 'Dinamarca',
    homeFlag: '🇫🇷',
    awayFlag: '🇩🇰',
    matchDate: '2026-06-23T15:00:00Z',
    phase: 'Fase de Grupos',
  },
  {
    id: 'match-4',
    homeTeam: 'Brasil',
    awayTeam: 'Serbia',
    homeFlag: '🇧🇷',
    awayFlag: '🇷🇸',
    matchDate: '2026-06-24T12:00:00Z',
    phase: 'Fase de Grupos',
  },
]

interface PredictionWithMatch extends Prediction {
  match?: Match
}

export default function PorraPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [predictions, setPredictions] = useState<PredictionWithMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else {
        fetchPredictions()
      }
    }
  }, [user, authLoading, router])

  const fetchPredictions = async () => {
    if (!user || !user.email) {
      setLoading(false)
      return
    }

    try {
      const username = user.email

      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('username', username)
        .order('id', { ascending: false })

      if (error) {
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        const predictionsWithMatches: PredictionWithMatch[] = data.map((pred) => {
          const match = MOCK_MATCHES.find((m) => m.id === pred.match_id)
          return {
            id: pred.id,
            username: pred.username,
            match_id: pred.match_id,
            home_score: pred.home_score,
            away_score: pred.away_score,
            match,
          }
        })
        setPredictions(predictionsWithMatches)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="mt-4 text-gray-600 font-medium">Cargando predicciones...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">📋 Mis Predicciones</h1>
              <p className="mt-2 text-gray-600">Todas tus predicciones guardadas</p>
            </div>

            {predictions.length > 0 ? (
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
                  >
                    {prediction.match ? (
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-6">
                          {/* Home Team */}
                          <div className="flex-1 flex flex-col items-center">
                            <span className="text-5xl mb-2">{prediction.match.homeFlag}</span>
                            <p className="text-sm font-semibold text-gray-800 text-center line-clamp-2 mb-3">
                              {prediction.match.homeTeam}
                            </p>
                            <div className="bg-blue-100 text-blue-900 rounded-lg px-4 py-2 font-bold text-2xl">
                              {prediction.home_score}
                            </div>
                          </div>

                          {/* VS */}
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-400 font-light text-2xl">vs</span>
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                            <span className="text-xs text-gray-500 mt-2">{prediction.match.phase}</span>
                          </div>

                          {/* Away Team */}
                          <div className="flex-1 flex flex-col items-center">
                            <span className="text-5xl mb-2">{prediction.match.awayFlag}</span>
                            <p className="text-sm font-semibold text-gray-800 text-center line-clamp-2 mb-3">
                              {prediction.match.awayTeam}
                            </p>
                            <div className="bg-blue-100 text-blue-900 rounded-lg px-4 py-2 font-bold text-2xl">
                              {prediction.away_score}
                            </div>
                          </div>
                        </div>

                        {/* Footer - Date */}
                        <div className="mt-4 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
                          Partido: {new Date(prediction.match.matchDate).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        Partido no encontrado (ID: {prediction.match_id})
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-lg">
                <p className="text-lg text-gray-600 mb-4">No tienes predicciones guardadas aún</p>
                <p className="text-sm text-gray-500">Ve a la sección de edición para crear tus primeras predicciones</p>
              </div>
            )}

            <div className="mt-8 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-6">
              <p className="text-sm text-blue-900">
                <strong>📊 Total de predicciones:</strong> {predictions.length}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
