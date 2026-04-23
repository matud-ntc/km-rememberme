---
name: RememberMe App
description: App de listas del hogar para 2 usuarios — stack, estructura y decisiones técnicas
type: project
---

App de tareas y recordatorios del hogar para 2 usuarios (Mati y partner).

**Stack:**
- Next.js 16 (App Router) + TypeScript
- Prisma 7 + Neon (PostgreSQL serverless)
- Framer Motion, Tailwind CSS 4, Radix UI
- Adapter: `@prisma/adapter-neon` (Prisma 7 requiere adapter, no `url` en schema.prisma)

**Why:** Prisma 7 cambió: la `url` ya no va en `schema.prisma` sino que se pasa via adapter en el constructor de `PrismaClient`.

**DB:** Neon — `postgresql://neondb_owner:npg_Gfe92JvhpuoC@ep-patient-morning-anyf11iz-pooler...`

**Usuarios sembrados:** `user_matu` (Mati 🧔 #60a5fa), `user_kari` (Kari 👩 #f472b6)
user_kari

**Secciones:**
1. `/supermercado` — Grid de iconos emoji por categoría, tap → modal de cantidad (1U, 1K, etc.)
2. `/hogar` — Tareas del hogar: mascotas (gatas x2 + Compota el perro), limpieza semanal/diaria

**Mascotas en el hogar:** 2 gatas + 1 perro (Compota)

**Seed:** `npm run seed` (usa `@prisma/adapter-pg` con `pg` para correr localmente, ya que `@neondatabase/serverless` falla sin WebSocket en Node.js puro)

**How to apply:** Al agregar features, recordar que Prisma 7 necesita el adapter y que las páginas deben tener `export const dynamic = 'force-dynamic'` para no pre-renderizarse estáticamente.
