'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, BookmarkPlus, MoreVertical, X, Loader2 } from 'lucide-react'
import { clearDoneGroceryItems, clearActiveGroceryList, clearAllGroceryItems } from '@/lib/actions'
import { SaveListModal } from './save-list-modal'

interface SupermercadoActionsProps {
  activeCount: number
  doneCount: number
}

export function SupermercadoActions({ activeCount, doneCount }: SupermercadoActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const action = (fn: () => Promise<void>) => {
    startTransition(() => { fn(); setMenuOpen(false) })
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <MoreVertical size={15} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                className="absolute right-0 top-full mt-2 z-50 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl min-w-[210px]"
              >
                {/* Save */}
                {activeCount > 0 && (
                  <button
                    onClick={() => { setMenuOpen(false); setSaveOpen(true) }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left border-b border-slate-700/50"
                  >
                    <BookmarkPlus size={15} className="text-violet-400 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">Guardar lista</p>
                      <p className="text-slate-500 text-xs">{activeCount} ítems</p>
                    </div>
                  </button>
                )}

                {/* Clear done */}
                {doneCount > 0 && (
                  <button
                    onClick={() => action(clearDoneGroceryItems)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left border-b border-slate-700/50"
                  >
                    <X size={15} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">Limpiar comprados</p>
                      <p className="text-slate-500 text-xs">{doneCount} tachados</p>
                    </div>
                  </button>
                )}

                {/* Clear active */}
                {activeCount > 0 && (
                  <button
                    onClick={() => action(clearActiveGroceryList)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left border-b border-slate-700/50"
                  >
                    <Trash2 size={15} className="text-orange-400 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">Limpiar lista activa</p>
                      <p className="text-slate-500 text-xs">Borra los pendientes</p>
                    </div>
                  </button>
                )}

                {/* Clear all */}
                {(activeCount > 0 || doneCount > 0) && (
                  <button
                    onClick={() => action(clearAllGroceryItems)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <Trash2 size={15} className="text-red-400 shrink-0" />
                    <div>
                      <p className="text-red-300 text-sm font-medium">Limpiar todo</p>
                      <p className="text-slate-500 text-xs">Borra todo y empieza de nuevo</p>
                    </div>
                  </button>
                )}

                {activeCount === 0 && doneCount === 0 && (
                  <p className="px-4 py-3 text-slate-500 text-sm">La lista está vacía</p>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <SaveListModal
        open={saveOpen}
        itemCount={activeCount}
        onClose={() => setSaveOpen(false)}
      />
    </>
  )
}
