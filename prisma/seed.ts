import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env') })

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { HOME_TASKS_DEF } from '../lib/data'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL not set')

  console.log('Connecting to:', url.substring(0, 30) + '...')

  const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    const mati = await prisma.user.upsert({
      where: { id: 'user_matu' },
      update: {},
      create: { id: 'user_matu', name: 'Matu', emoji: '🧑', color: '#60a5fa' },
    })

    const lu = await prisma.user.upsert({
      where: { id: 'user_kari' },
      update: {},
      create: { id: 'user_kari', name: 'Kari', emoji: '👩', color: '#f472b6' },
    })

    console.log(`✓ Users: ${mati.name}, ${lu.name}`)

    for (const task of HOME_TASKS_DEF) {
      await prisma.homeTask.upsert({
        where: { key: task.key },
        update: { name: task.name, emoji: task.emoji, category: task.category, frequency: task.frequency, order: task.order },
        create: { key: task.key, name: task.name, emoji: task.emoji, category: task.category, frequency: task.frequency, order: task.order },
      })
    }

    console.log(`✓ Home tasks: ${HOME_TASKS_DEF.length} seeded`)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
