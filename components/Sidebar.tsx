'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Predicciones',
      href: '/porra',
      icon: '⚽',
    },
    {
      label: 'Clasificación',
      href: '/clasificacion',
      icon: '🏆',
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800
          transform lg:transform-none transition-transform duration-300 ease-in-out
          lg:z-auto z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚽</span>
            <div>
              <h2 className="text-white font-bold text-lg">Porra</h2>
              <p className="text-blue-200 text-xs">Mundial</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive(item.href)
                        ? 'bg-white text-blue-900 font-semibold shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-700 text-blue-200 text-xs text-center">
          <p>🌍 Mundial 2026</p>
        </div>
      </aside>
    </>
  )
}
