export const dynamic = 'force-dynamic'

import { getHomeTasks } from '@/lib/actions'
import { HomeTaskList } from '@/components/home-task-list'
import { UserSelector } from '@/components/user-selector'
import { HogarActions } from '@/components/hogar-actions'

export default async function HogarPage() {
  const tasks = await getHomeTasks()
  const today = new Date()
  const dateStr = today.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const dailyDone = tasks.filter(
    (t: (typeof tasks)[number]) => t.frequency === 'daily' && t.todayCompletions.length > 0,
  ).length
  const dailyTotal = tasks.filter(
    (t: (typeof tasks)[number]) => t.frequency === 'daily',
  ).length

  const anyDone = tasks.some(
    (t: (typeof tasks)[number]) => t.todayCompletions.length > 0,
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-xl font-bold text-white">🏠 Hogar</h1>
          <p className="text-xs text-slate-500 mt-0.5 capitalize">{dateStr}</p>
          <p className="text-xs text-violet-400 mt-0.5">
            {dailyDone}/{dailyTotal} tareas del día ✓
          </p>
        </div>
        <div className="flex items-center gap-2">
          {anyDone && <HogarActions />}
          <UserSelector />
        </div>
      </div>

      <HomeTaskList tasks={tasks} />
    </div>
  )
}
