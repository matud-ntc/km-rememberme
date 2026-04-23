'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Home } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/supermercado', label: 'Súper', icon: ShoppingCart, emoji: '🛒' },
  { href: '/hogar', label: 'Hogar', icon: Home, emoji: '🏠' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f1019]/95 backdrop-blur-xl border-t border-slate-800 max-w-lg mx-auto">
      <div className="flex items-center justify-around px-4 py-2 pb-safe">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-2 px-6 relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-violet-600/15 rounded-2xl border border-violet-500/20"
                />
              )}
              <span className="text-xl relative z-10">{item.emoji}</span>
              <span
                className={`text-xs font-semibold relative z-10 ${active ? 'text-violet-400' : 'text-slate-500'}`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
