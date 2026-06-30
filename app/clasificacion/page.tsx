'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'

interface UserScore {
  username: string
  displayName: string
  totalPredictions: number
  exactMatches: number
  correctWinners: number
  points: number
}

export default function ClasificacionPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [scores, setScores] = useState<UserScore[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else {
        fetchScores()
      }
    }
  }, [user, authLoading, router])

  const fetchScores = async () => {
    try {
      // Fetch all predictions with users
      const { data: predictions, error: predError } = await supabase
        .from('predictions')
        .select('*')

      if (predError) {
        console.error('Error fetching predictions:', predError)
        return
      }

      // Fetch all results
      const { data: results, error: resError } = await supabase
        .from('results')
        .select('*')

      if (resError) {
        console.error('Error fetching results:', resError)
        return
      }

      // Fetch all users to get display names
      const { data: users } = await supabase
        .from('users')
        .select('email, display_name')

      // Create a map of email -> display_name
      const userMap = new Map<string, string>()
      users?.forEach((u) => {
        userMap.set(u.email, u.display_name || u.email)
      })

      // Calculate scores
      const scoreMap = new Map<string, UserScore>()

      predictions?.forEach((pred) => {
        const result = results?.find((r) => r.match_id === pred.match_id)

        if (!scoreMap.has(pred.username)) {
          const displayName = userMap.get(pred.username) || pred.username.split('@')[0] || pred.username
          scoreMap.set(pred.username, {
            username: pred.username,
            displayName,
            totalPredictions: 0,
            exactMatches: 0,
            correctWinners: 0,
            points: 0,
          })
        }

        const score = scoreMap.get(pred.username)!
        score.totalPredictions++

        if (result) {
          // Exact match: 3 points
          if (pred.home_score === result.home_score && pred.away_score === result.away_score) {
            score.exactMatches++
            score.points += 3
          }
          // Correct winner/tie: 1 point
          else if (
            Math.sign(pred.home_score - pred.away_score) ===
            Math.sign(result.home_score - result.away_score)
          ) {
            score.correctWinners++
            score.points += 1
          }
        }
      })

      // Sort by points descending
      const sorted = Array.from(scoreMap.values()).sort((a, b) => b.points - a.points)

      setScores(sorted)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="inline-block">
              <svg className="animate-spin h-12 w-12 text-blue-600" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Cargando clasificación...</p>
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
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Clasificación</h1>
              <p className="text-gray-600">Ranking de pronosticadores</p>
            </div>

            {/* Scores Table */}
            {scores.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Header */}
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-semibold">Posición</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Usuario</th>
                        <th className="px-6 py-4 text-center text-white font-semibold">Exactos</th>
                        <th className="px-6 py-4 text-center text-white font-semibold">Ganadores</th>
                        <th className="px-6 py-4 text-center text-white font-semibold">Total</th>
                        <th className="px-6 py-4 text-right text-white font-semibold">Puntos</th>
                      </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-200">
                      {scores.map((score, idx) => (
                        <tr
                          key={score.username}
                          className={`
                            transition-colors duration-200
                            ${
                              idx === 0
                                ? 'bg-yellow-50 hover:bg-yellow-100'
                                : idx === 1
                                  ? 'bg-gray-50 hover:bg-gray-100'
                                  : idx === 2
                                    ? 'bg-orange-50 hover:bg-orange-100'
                                    : 'hover:bg-blue-50'
                            }
                          `}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`
                                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                                  ${
                                    idx === 0
                                      ? 'bg-yellow-500'
                                      : idx === 1
                                        ? 'bg-gray-400'
                                        : idx === 2
                                          ? 'bg-orange-500'
                                          : 'bg-blue-500'
                                  }
                                `}
                              >
                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">{score.displayName}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {score.exactMatches}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {score.correctWinners}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">
                            {score.totalPredictions}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-2xl font-bold text-blue-600">{score.points}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No hay predicciones aún</p>
                <p className="text-gray-500">Los usuarios aparecerán aquí cuando hagan predicciones</p>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-blue-900 text-sm">
                <strong>Puntuación:</strong> Exacto = 3 puntos | Ganador correcto = 1 punto | Incorrecto = 0 puntos
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
