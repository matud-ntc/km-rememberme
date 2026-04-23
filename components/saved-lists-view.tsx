'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingCart, ChevronDown, ChevronUp, Loader2, BookmarkPlus } from 'lucide-react'
import { GROCERY_ITEMS } from '@/lib/data'
import { deleteSavedList, loadSavedList } from '@/lib/actions'
import { useUser } from './user-provider'
import { useRouter } from 'next/navigation'

interface SavedItem {
  id: string
  itemKey: string
  quantity: string
}

interface SavedList {
  id: string
  name: string
  items: SavedItem[]
  createdAt: Date
}

interface SavedListsViewProps {
  lists: SavedList[]
}

export function SavedListsView({ lists }: SavedListsViewProps) {
  const { currentUser } = useUser()
  const router = useRouter()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleLoad = (list: SavedList) => {
    if (!currentUser) return
    setLoading(list.id)
    startTransition(async () => {
      await loadSavedList(list.id, currentUser.id)
      router.push('/supermercado')
    })
  }

  const handleDelete = (listId: string) => {
    startTransition(() => deleteSavedList(listId))
  }

  if (lists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 pt-20 gap-4">
        <span className="text-6xl">📋</span>
        <p className="text-slate-400 text-center text-sm leading-relaxed">
          Todavía no guardaste ninguna lista.{'\n'}
          <span className="text-slate-500">Andá al súper y guardá la lista activa con el botón 💾</span>
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 space-y-3">
      {lists.map((list, i) => {
        const isExpanded = expanded === list.id
        const isLoading = loading === list.id
        const dateStr = new Date(list.createdAt).toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })

        return (
          <motion.div
            key={list.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-xl shrink-0">
                🛒
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{list.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {dateStr} · {list.items.length} ítem{list.items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setExpanded(isExpanded ? null : list.id)}
                className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Emoji preview (always visible) */}
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {list.items.slice(0, 12).map((item) => {
                const def = GROCERY_ITEMS.find((d) => d.key === item.itemKey)
                return (
                  <span key={item.id} className="text-lg" title={def?.name}>
                    {def?.emoji ?? '📦'}
                  </span>
                )
              })}
              {list.items.length > 12 && (
                <span className="text-xs text-slate-500 self-center">+{list.items.length - 12}</span>
              )}
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-700/40"
                >
                  <div className="divide-y divide-slate-700/30">
                    {list.items.map((item) => {
                      const def = GROCERY_ITEMS.find((d) => d.key === item.itemKey)
                      return (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-2">
                          <span className="text-lg">{def?.emoji ?? '📦'}</span>
                          <span className="text-sm text-slate-300 flex-1">{def?.name ?? item.itemKey}</span>
                          <span className="text-xs font-bold text-violet-400">{item.quantity}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-2 px-4 pb-4 pt-1">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleLoad(list)}
                disabled={!currentUser || isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold disabled:opacity-50 hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20"
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    Cargar en el súper
                  </>
                )}
              </motion.button>
              <button
                onClick={() => handleDelete(list.id)}
                className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
