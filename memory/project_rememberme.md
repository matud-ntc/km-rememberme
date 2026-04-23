---
name: RememberMe App
description: App de listas del hogar para 2 usuarios — stack, estructura y decisiones técnicas
type: project
---

App de tareas y recordatorios del hogar para 2 usuarios (Matu y Kari).

**Stack:**
- Next.js 16 (App Router) + TypeScript
- Prisma 7 + Neon (PostgreSQL serverless)
- Framer Motion, Tailwind CSS 4
- Adapter: `@prisma/adapter-neon` (Prisma 7 requiere adapter, no `url` en schema.prisma)
- PWA: manifest via `app/manifest.ts`, service worker en `public/sw.js`, iconos 192/512px

**Why:** Prisma 7 cambió: la `url` ya no va en `schema.prisma` sino que se pasa via adapter en el constructor de `PrismaClient`.

**DB:** Neon — `postgresql://neondb_owner:npg_Gfe92JvhpuoC@ep-patient-morning-anyf11iz-pooler...`

**Usuarios:** `user_matu` (Matu 🧑 #60a5fa), `user_kari` (Kari 👩 #f472b6) — pelo negro

**Secciones:**
1. `/supermercado` — Grid de iconos emoji por categoría, tap → modal de cantidad (1U, 1K, etc.)
2. `/hogar` — Tareas del hogar: mascotas (gatas x2 + Compota el perro), limpieza semanal/diaria
3. `/historial` — Listas guardadas del súper: guardar con nombre, cargar, eliminar

**Mascotas en el hogar:** 2 gatas + 1 perro (Compota)

**Seed:** `npm run seed` (usa `@prisma/adapter-pg` con `pg` para correr localmente, ya que `@neondatabase/serverless` falla sin WebSocket en Node.js puro)

**TypeScript gotcha (Vercel):** Vercel es más estricto que local. Siempre tipar callbacks de `.filter()/.map()` explícitamente cuando el tipo no se infiere: `(t: (typeof tasks)[number]) => ...`

**How to apply:** Prisma 7 necesita el adapter. Páginas con DB queries necesitan `export const dynamic = 'force-dynamic'`. En Vercel, TypeScript es estricto — tipear todos los callbacks.
