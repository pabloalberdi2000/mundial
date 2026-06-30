'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuario'

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menu Button (Mobile) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚽</span>
            <div>
              <h1 className="text-white text-2xl font-bold">Porra Mundial</h1>
              <p className="text-blue-100 text-xs">Pronostica y gana</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition duration-200"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold hidden sm:inline">{username}</span>
              <svg
                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-gray-700 font-semibold">{username}</p>
                  <p className="text-gray-500 text-sm truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setShowDropdown(false)
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
