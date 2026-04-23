'use client'

import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { HOME_TASK_CATEGORIES } from '@/lib/data'
import { completeHomeTask, resetHomeTask } from '@/lib/actions'
import { useUser } from './user-provider'

interface Completion {
  id: string
  userId: string
  user: { id: string; name: string; emoji: string; color: string }
  completedAt: Date
}

interface HomeTask {
  id: string
  key: string
  name: string
  emoji: string
  category: string
  frequency: string
  todayCompletions: Completion[]
}

interface HomeTaskListProps {
  tasks: HomeTask[]
}

export function HomeTaskList({ tasks }: HomeTaskListProps) {
  const { currentUser } = useUser()
  const [, startTransition] = useTransition()

  const handleComplete = (taskId: string) => {
    if (!currentUser) return
    startTransition(() => completeHomeTask(taskId, currentUser.id))
  }

  const handleReset = (taskId: string) => {
    startTransition(() => resetHomeTask(taskId))
  }

  const categories = HOME_TASK_CATEGORIES.filter((cat) =>
    tasks.some((t) => t.category === cat.key),
  )

  return (
    <div className="px-4 py-4 space-y-6">
      {categories.map((cat) => {
        const catTasks = tasks.filter((t) => t.category === cat.key)
        return (
          <div key={cat.key}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{cat.emoji}</span>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{cat.name}</h2>
            </div>

            <div className="space-y-2">
              {catTasks.map((task) => {
                const completions = task.todayCompletions
                const myCompletion = currentUser
                  ? completions.find((c) => c.userId === currentUser.id)
                  : null
                const otherCompletions = currentUser
                  ? completions.filter((c) => c.userId !== currentUser.id)
                  : completions
                const isFullyDone = completions.length >= 2 || (task.frequency === 'weekly' && completions.length >= 1)
                const isDoneByMe = !!myCompletion

                return (
                  <motion.div
                    key={task.id}
                    layout
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      isFullyDone
                        ? 'bg-green-900/20 border-green-500/30'
                        : isDoneByMe
                        ? 'bg-violet-900/20 border-violet-500/30'
                        : 'bg-slate-800/60 border-slate-700/50'
                    }`}
                  >
                    {/* Emoji */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                        isFullyDone
                          ? 'bg-green-500/20'
                          : isDoneByMe
                          ? 'bg-violet-500/20'
                          : 'bg-slate-700/50'
                      }`}
                    >
                      {task.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${isFullyDone ? 'text-green-300 line-through' : 'text-white'}`}>
                        {task.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {task.frequency === 'daily' ? '📅 Diario' : '📅 Semanal'}
                      </p>

                      {/* Who completed */}
                      {completions.length > 0 && (
                        <div className="flex items-center gap-1 mt-1.5">
                          {completions.map((c) => (
                            <span
                              key={c.id}
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: c.user.color + '25',
                                color: c.user.color,
                                border: `1px solid ${c.user.color}40`,
                              }}
                            >
                              {c.user.emoji} {c.user.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {completions.length > 0 && (
                        <button
                          onClick={() => handleReset(task.id)}
                          className="w-7 h-7 rounded-full bg-slate-700/60 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-all"
                        >
                          <RotateCcw size={12} />
                        </button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleComplete(task.id)}
                        disabled={!currentUser}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border-2 transition-all ${
                          isDoneByMe
                            ? 'border-violet-500 bg-violet-500/30 text-violet-300'
                            : 'border-slate-600 bg-slate-700/50 text-slate-500 hover:border-violet-500/60'
                        }`}
                        title={isDoneByMe ? 'Desmarcar' : 'Marcar como hecho'}
                      >
                        {isDoneByMe ? '✓' : '○'}
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
