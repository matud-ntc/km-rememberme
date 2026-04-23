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
  return prisma.groceryItem.findMany({
    where: { done: false },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getDoneGroceryItems() {
  return prisma.groceryItem.findMany({
    where: { done: true },
    include: { user: true },
    orderBy: { updatedAt: 'desc' },
    take: 30,
  })
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

export async function clearGroceryList() {
  await prisma.groceryItem.deleteMany({ where: { done: true } })
  revalidatePath('/supermercado')
}

// ─── Home Tasks ───────────────────────────────────────────────────────────────

export async function getHomeTasks() {
  const today = getTodayString()
  const week = getWeekString()

  const tasks = await prisma.homeTask.findMany({
    orderBy: { order: 'asc' },
    include: {
      completions: {
        where: {
          date: { in: [today, week] },
        },
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

  await prisma.taskCompletion.deleteMany({
    where: { taskId, date: dateKey },
  })

  revalidatePath('/hogar')
}
