'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from './user-provider'

export function UserSelector() {
  const { currentUser, setCurrentUser, users } = useUser()
  const [open, setOpen] = useState(false)

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b10]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8 px-6"
        >
          <div className="text-center">
            <p className="text-5xl mb-4">👋</p>
            <h1 className="text-2xl font-bold text-white mb-2">¿Quién sos?</h1>
            <p className="text-slate-400 text-sm">Elegí tu usuario para empezar</p>
          </div>
          <div className="flex gap-4">
            {users.map((user) => (
              <motion.button
                key={user.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentUser(user)}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-700 bg-slate-800/50 min-w-[120px]"
                style={{ borderColor: user.color + '40' }}
              >
                <span className="text-5xl">{user.emoji}</span>
                <span className="text-white font-semibold text-lg">{user.name}</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700"
      >
        <span className="text-xl">{currentUser.emoji}</span>
        <span className="text-sm text-slate-300 font-medium">{currentUser.name}</span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentUser.color }}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 z-50 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl min-w-[160px]"
            >
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => { setCurrentUser(user); setOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors ${currentUser.id === user.id ? 'bg-slate-700/60' : ''}`}
                >
                  <span className="text-xl">{user.emoji}</span>
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  {currentUser.id === user.id && (
                    <span className="ml-auto text-xs" style={{ color: user.color }}>●</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
