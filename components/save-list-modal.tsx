'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookmarkPlus, Loader2 } from 'lucide-react'
import { saveCurrentList } from '@/lib/actions'

interface SaveListModalProps {
  open: boolean
  itemCount: number
  onClose: () => void
}

export function SaveListModal({ open, itemCount, onClose }: SaveListModalProps) {
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    startTransition(async () => {
      await saveCurrentList(trimmed)
      setDone(true)
      setTimeout(() => {
        setDone(false)
        setName('')
        onClose()
      }, 1000)
    })
  }

  const suggestions = ['Semana', 'Quincena', 'Asado', 'Compra mensual', 'Cumple']

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1d2e] rounded-t-3xl px-6 pb-10 pt-6 max-w-lg mx-auto"
          >
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💾</span>
                <div>
                  <h2 className="text-white font-bold text-lg">Guardar lista</h2>
                  <p className="text-slate-400 text-xs">{itemCount} ítems en la lista activa</p>
                </div>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
                <X size={20} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Nombre de la lista..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors mb-3"
            />

            <div className="flex gap-2 flex-wrap mb-5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setName(s)}
                  className="px-3 py-1 rounded-full bg-slate-700/60 text-slate-400 text-xs hover:text-white hover:bg-slate-700 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={!name.trim() || isPending}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
              style={{
                background: done ? '#22c55e' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: done ? '0 4px 20px #22c55e30' : '0 4px 20px #7c3aed30',
              }}
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : done ? (
                '✓ Guardada'
              ) : (
                <>
                  <BookmarkPlus size={16} />
                  Guardar lista
                </>
              )}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
