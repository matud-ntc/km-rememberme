'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './db'
import { getTodayString, getWeekString } from './data'

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: 'asc' } })
}

// ─── Grocery ──────────────────────────────────────────────────────────────────

export async function getGroceryItems() {
  const items = await prisma.groceryItem.findMany({
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  })
  return items
}

export async function addOrUpdateGroceryItem(
  itemKey: string,
  quantity: string,
  userId: string,
) {
  const existing = await prisma.groceryItem.findFirst({
    where: { itemKey, done: false },
  })
  if (existing) {
    await prisma.groceryItem.update({
      where: { id: existing.id },
      data: { quantity, userId },
    })
  } else {
    await prisma.groceryItem.create({
      data: { itemKey, quantity, userId },
    })
  }
  revalidatePath('/supermercado')
}

export async function removeGroceryItem(id: string) {
  await prisma.groceryItem.delete({ where: { id } })
  revalidatePath('/supermercado')
}

export async function toggleGroceryDone(id: string) {
  const item = await prisma.groceryItem.findUnique({ where: { id } })
  if (!item) return
  await prisma.groceryItem.update({
    where: { id },
    data: { done: !item.done },
  })
  revalidatePath('/supermercado')
}

export async function clearDoneGroceryItems() {
  await prisma.groceryItem.deleteMany({ where: { done: true } })
  revalidatePath('/supermercado')
}

export async function clearActiveGroceryList() {
  await prisma.groceryItem.deleteMany({ where: { done: false } })
  revalidatePath('/supermercado')
}

export async function clearAllGroceryItems() {
  await prisma.groceryItem.deleteMany({})
  revalidatePath('/supermercado')
}

// ─── Saved Lists ──────────────────────────────────────────────────────────────

export async function saveCurrentList(name: string) {
  const activeItems = await prisma.groceryItem.findMany({
    where: { done: false },
  })
  if (activeItems.length === 0) return

  await prisma.savedList.create({
    data: {
      name,
      items: {
        create: activeItems.map((item) => ({
          itemKey: item.itemKey,
          quantity: item.quantity,
        })),
      },
    },
  })
  revalidatePath('/historial')
}

export async function getSavedLists() {
  return prisma.savedList.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function loadSavedList(listId: string, userId: string) {
  const savedList = await prisma.savedList.findUnique({
    where: { id: listId },
    include: { items: true },
  })
  if (!savedList) return

  for (const savedItem of savedList.items) {
    const existing = await prisma.groceryItem.findFirst({
      where: { itemKey: savedItem.itemKey, done: false },
    })
    if (existing) {
      await prisma.groceryItem.update({
        where: { id: existing.id },
        data: { quantity: savedItem.quantity, userId },
      })
    } else {
      await prisma.groceryItem.create({
        data: { itemKey: savedItem.itemKey, quantity: savedItem.quantity, userId },
      })
    }
  }
  revalidatePath('/supermercado')
}

export async function deleteSavedList(listId: string) {
  await prisma.savedList.delete({ where: { id: listId } })
  revalidatePath('/historial')
}

export async function renameSavedList(listId: string, name: string) {
  await prisma.savedList.update({ where: { id: listId }, data: { name } })
  revalidatePath('/historial')
}

// ─── Home Tasks ───────────────────────────────────────────────────────────────

export async function getHomeTasks() {
  const today = getTodayString()
  const week = getWeekString()

  const tasks = await prisma.homeTask.findMany({
    orderBy: { order: 'asc' },
    include: {
      completions: {
        where: { date: { in: [today, week] } },
        include: { user: true },
        orderBy: { completedAt: 'desc' },
      },
    },
  })

  return tasks.map((task) => {
    const dateKey = task.frequency === 'daily' ? today : week
    const todayCompletions = task.completions.filter((c) => c.date === dateKey)
    return { ...task, todayCompletions }
  })
}

export async function completeHomeTask(taskId: string, userId: string) {
  const task = await prisma.homeTask.findUnique({ where: { id: taskId } })
  if (!task) return

  const dateKey = task.frequency === 'daily' ? getTodayString() : getWeekString()
  const existing = await prisma.taskCompletion.findFirst({
    where: { taskId, userId, date: dateKey },
  })

  if (existing) {
    await prisma.taskCompletion.delete({ where: { id: existing.id } })
  } else {
    await prisma.taskCompletion.create({
      data: { taskId, userId, date: dateKey },
    })
  }
  revalidatePath('/hogar')
}

export async function resetHomeTask(taskId: string) {
  const task = await prisma.homeTask.findUnique({ where: { id: taskId } })
  if (!task) return
  const dateKey = task.frequency === 'daily' ? getTodayString() : getWeekString()
  await prisma.taskCompletion.deleteMany({ where: { taskId, date: dateKey } })
  revalidatePath('/hogar')
}

export async function clearAllHomeTasks() {
  const today = getTodayString()
  const week = getWeekString()
  await prisma.taskCompletion.deleteMany({
    where: { date: { in: [today, week] } },
  })
  revalidatePath('/hogar')
}
