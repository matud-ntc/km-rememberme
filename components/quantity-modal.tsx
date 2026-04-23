'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { QUANTITY_OPTIONS, type GroceryItemDef } from '@/lib/data'

interface QuantityModalProps {
  item: GroceryItemDef | null
  currentQty?: string
  onConfirm: (quantity: string) => void
  onRemove?: () => void
  onClose: () => void
}

export function QuantityModal({ item, currentQty, onConfirm, onRemove, onClose }: QuantityModalProps) {
  const [selected, setSelected] = useState<string>(currentQty ?? '')
  const [custom, setCustom] = useState('')

  useEffect(() => {
    if (item) {
      setSelected(currentQty ?? '')
      setCustom('')
    }
  }, [item, currentQty])

  if (!item) return null

  const options = QUANTITY_OPTIONS[item.quantityType]

  const handleConfirm = () => {
    const qty = custom.trim() || selected
    if (!qty) return
    onConfirm(qty)
    onClose()
  }

  const unitLabel = item.quantityType === 'unit' ? 'unidades' : item.quantityType === 'weight' ? 'kg' : 'litros'

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1d2e] rounded-t-3xl px-6 pb-8 pt-6 max-w-lg mx-auto"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{item.emoji}</span>
                <div>
                  <h2 className="text-white font-bold text-lg">{item.name}</h2>
                  <p className="text-slate-400 text-xs">{unitLabel}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
                <X size={20} />
              </button>
            </div>

            {/* Quick options */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => { setSelected(opt); setCustom('') }}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    selected === opt && !custom
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            {/* Custom input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Otra cantidad... (ej: 3/4K, 5U)"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected('') }}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {onRemove && (
                <button
                  onClick={() => { onRemove(); onClose() }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Quitar</span>
                </button>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                disabled={!selected && !custom.trim()}
                className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-colors"
              >
                {currentQty ? 'Actualizar' : 'Agregar a la lista'} ✓
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
