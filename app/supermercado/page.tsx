export const dynamic = 'force-dynamic'

import { getGroceryItems } from '@/lib/actions'
import { GroceryGrid } from '@/components/grocery-grid'
import { UserSelector } from '@/components/user-selector'
import { SupermercadoActions } from '@/components/supermercado-actions'

export default async function SupermercadoPage() {
  const items = await getGroceryItems()
  const activeItems = items.filter((i: (typeof items)[number]) => !i.done)
  const doneItems = items.filter((i: (typeof items)[number]) => i.done)

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-xl font-bold text-white">🛒 Supermercado</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeItems.length} ítems en lista
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SupermercadoActions
            activeCount={activeItems.length}
            doneCount={doneItems.length}
          />
          <UserSelector />
        </div>
      </div>

      <GroceryGrid items={items} />
    </div>
  )
}
