export const dynamic = 'force-dynamic'

import { getSavedLists } from '@/lib/actions'
import { SavedListsView } from '@/components/saved-lists-view'
import { UserSelector } from '@/components/user-selector'

export default async function HistorialPage() {
  const lists = await getSavedLists()

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-xl font-bold text-white">📚 Historial</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lists.length} lista{lists.length !== 1 ? 's' : ''} guardada{lists.length !== 1 ? 's' : ''}
          </p>
        </div>
        <UserSelector />
      </div>

      <SavedListsView lists={lists} />
    </div>
  )
}
