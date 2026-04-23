'use client'

import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Loader2 } from 'lucide-react'
import { clearAllHomeTasks } from '@/lib/actions'

export function HogarActions() {
  const [isPending, startTransition] = useTransition()

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => startTransition(() => clearAllHomeTasks())}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs hover:text-orange-400 hover:border-orange-500/30 transition-all disabled:opacity-50"
      title="Reiniciar todas las tareas de hoy"
    >
      {isPending ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <RotateCcw size={12} />
      )}
      Reiniciar
    </motion.button>
  )
}
