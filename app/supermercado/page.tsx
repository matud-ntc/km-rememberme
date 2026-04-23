export const dynamic = 'force-dynamic'

import { getGroceryItems, clearGroceryList } from '@/lib/actions'
import { GroceryGrid } from '@/components/grocery-grid'
import { UserSelector } from '@/components/user-selector'
import { Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

async function clearDone() {
  'use server'
  await clearGroceryList()
  revalidatePath('/supermercado')
}

export default async function SupermercadoPage() {
  const items = await getGroceryItems()
  const doneCount = items.filter((i) => i.done).length

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-xl font-bold text-white">🛒 Supermercado</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {items.filter((i) => !i.done).length} ítems en lista
          </p>
        </div>
        <div className="flex items-center gap-2">
          {doneCount > 0 && (
            <form action={clearDone}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs hover:text-red-400 hover:border-red-500/30 transition-colors"
              >
                <Trash2 size={12} />
                Limpiar ({doneCount})
              </button>
            </form>
          )}
          <UserSelector />
        </div>
      </div>

      <GroceryGrid items={items} />
    </div>
  )
}
