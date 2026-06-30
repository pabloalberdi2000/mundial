import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userUsername = localStorage.getItem('userUsername')
        const authToken = localStorage.getItem('authToken')

        if (userUsername && authToken) {
          setUser({
            id: authToken,
            email: userUsername,
            user_metadata: {
              username: userUsername,
            },
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem('userUsername')
    localStorage.removeItem('authToken')
    setUser(null)
    router.push('/login')
  }

  return { user, loading, logout }
}
