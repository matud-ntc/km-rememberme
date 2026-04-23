export const dynamic = 'force-dynamic'

import { getHomeTasks } from '@/lib/actions'
import { HomeTaskList } from '@/components/home-task-list'
import { UserSelector } from '@/components/user-selector'

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
        <UserSelector />
      </div>

      <HomeTaskList tasks={tasks} />
    </div>
  )
}
