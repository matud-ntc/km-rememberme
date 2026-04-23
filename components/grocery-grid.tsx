'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { GROCERY_ITEMS, GROCERY_CATEGORIES, type GroceryItemDef } from '@/lib/data'
import { QuantityModal } from './quantity-modal'
import { useUser } from './user-provider'
import { addOrUpdateGroceryItem, removeGroceryItem, toggleGroceryDone } from '@/lib/actions'

interface GroceryItemRecord {
  id: string
  itemKey: string
  quantity: string
  done: boolean
  userId: string
  user: { id: string; name: string; emoji: string; color: string }
}

interface GroceryGridProps {
  items: GroceryItemRecord[]
}

export function GroceryGrid({ items }: GroceryGridProps) {
  const { currentUser } = useUser()
  const [selectedCategory, setSelectedCategory] = useState('verduras')
  const [modalItem, setModalItem] = useState<GroceryItemDef | null>(null)
  const [, startTransition] = useTransition()

  const categoryItems = GROCERY_ITEMS.filter((i) => i.category === selectedCategory)

  const getListItem = (key: string) => items.find((i) => i.itemKey === key && !i.done)
  const getDoneItem = (key: string) => items.find((i) => i.itemKey === key && i.done)

  const handleItemTap = (item: GroceryItemDef) => {
    if (!currentUser) return
    setModalItem(item)
  }

  const handleConfirm = (quantity: string) => {
    if (!currentUser || !modalItem) return
    startTransition(() => {
      addOrUpdateGroceryItem(modalItem.key, quantity, currentUser.id)
    })
  }

  const handleRemove = () => {
    if (!modalItem) return
    const existing = getListItem(modalItem.key)
    if (existing) {
      startTransition(() => removeGroceryItem(existing.id))
    }
  }

  const handleToggleDone = (id: string) => {
    startTransition(() => toggleGroceryDone(id))
  }

  const activeItems = items.filter((i) => !i.done)
  const doneItems = items.filter((i) => i.done)

  return (
    <div className="flex flex-col h-full">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 pt-4">
        {GROCERY_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat.key
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 px-4 pt-4 pb-4">
        {categoryItems.map((item) => {
          const listItem = getListItem(item.key)
          const doneItem = getDoneItem(item.key)
          const inList = !!listItem
          const isDone = !!doneItem

          return (
            <motion.button
              key={item.key}
              whileTap={{ scale: 0.88 }}
              onClick={() => handleItemTap(item)}
              className={`relative flex flex-col items-center justify-center gap-1.5 aspect-square rounded-2xl transition-all ${
                isDone
                  ? 'bg-green-900/30 border border-green-500/30'
                  : inList
                  ? 'bg-violet-900/40 border-2 border-violet-500/70 shadow-lg shadow-violet-500/20'
                  : 'bg-slate-800/80 border border-slate-700/50 hover:bg-slate-800'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span
                className={`text-[9px] font-medium text-center leading-tight px-1 ${
                  isDone ? 'text-green-400' : inList ? 'text-violet-300' : 'text-slate-400'
                }`}
              >
                {item.name}
              </span>

              {/* Quantity badge */}
              {inList && listItem && (
                <div className="absolute -top-1.5 -right-1.5 bg-violet-600 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md">
                  {listItem.quantity}
                </div>
              )}

              {/* Done checkmark */}
              {isDone && (
                <div className="absolute -top-1.5 -right-1.5 bg-green-500 rounded-full p-0.5">
                  <Check size={8} className="text-white" />
                </div>
              )}

              {/* User dot */}
              {inList && listItem && (
                <div
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[7px]"
                  style={{ backgroundColor: listItem.user.color }}
                  title={listItem.user.name}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Active list summary */}
      {activeItems.length > 0 && (
        <div className="mx-4 mb-4 bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
            <ShoppingCart size={16} className="text-violet-400" />
            <span className="text-sm font-semibold text-white">Lista activa</span>
            <span className="ml-auto text-xs text-slate-400">{activeItems.length} ítems</span>
          </div>
          <div className="divide-y divide-slate-700/30">
            {activeItems.map((item) => {
              const def = GROCERY_ITEMS.find((d) => d.key === item.itemKey)
              return (
                <div key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="text-xl">{def?.emoji ?? '📦'}</span>
                  <span className="text-sm text-slate-300 flex-1">{def?.name ?? item.itemKey}</span>
                  <span className="text-xs font-bold text-violet-400">{item.quantity}</span>
                  <span
                    className="w-5 h-5 rounded-full text-xs flex items-center justify-center border border-slate-600"
                    style={{ backgroundColor: item.user.color + '30', color: item.user.color }}
                    title={item.user.name}
                  >
                    {item.user.emoji}
                  </span>
                  <button
                    onClick={() => handleToggleDone(item.id)}
                    className="w-6 h-6 rounded-full border-2 border-slate-600 hover:border-green-500 hover:bg-green-500/20 transition-all"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Done items */}
      {doneItems.length > 0 && (
        <div className="mx-4 mb-6 bg-slate-800/30 border border-slate-700/30 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/30">
            <span className="text-xs font-semibold text-slate-500">Comprado ✓</span>
          </div>
          <div className="divide-y divide-slate-700/20">
            {doneItems.map((item) => {
              const def = GROCERY_ITEMS.find((d) => d.key === item.itemKey)
              return (
                <div key={item.id} className="flex items-center gap-3 px-4 py-2 opacity-50">
                  <span className="text-lg">{def?.emoji ?? '📦'}</span>
                  <span className="text-sm text-slate-400 flex-1 line-through">{def?.name ?? item.itemKey}</span>
                  <span className="text-xs text-slate-500">{item.quantity}</span>
                  <button
                    onClick={() => handleToggleDone(item.id)}
                    className="w-5 h-5 rounded-full bg-green-500/30 border border-green-500/50 flex items-center justify-center"
                  >
                    <Check size={10} className="text-green-400" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      <QuantityModal
        item={modalItem}
        currentQty={modalItem ? getListItem(modalItem.key)?.quantity : undefined}
        onConfirm={handleConfirm}
        onRemove={modalItem && getListItem(modalItem.key) ? handleRemove : undefined}
        onClose={() => setModalItem(null)}
      />
    </div>
  )
}
