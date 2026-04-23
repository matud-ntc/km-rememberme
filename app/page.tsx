import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] px-4 pt-16 pb-8">
      <div className="text-center mb-12">
        <p className="text-5xl mb-3">🏡</p>
        <h1 className="text-3xl font-bold text-white">RememberMe</h1>
        <p className="text-slate-400 text-sm mt-2">Listas del hogar para los dos</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/supermercado">
          <div className="group relative overflow-hidden bg-gradient-to-br from-violet-900/60 to-violet-800/30 border border-violet-500/30 rounded-3xl p-6 flex items-center gap-5 active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/10">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center text-4xl shrink-0">
              🛒
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Supermercado</h2>
              <p className="text-violet-300/80 text-sm mt-0.5">Hacé la lista tocando los iconos</p>
            </div>
            <span className="ml-auto text-violet-400 text-xl">›</span>
          </div>
        </Link>

        <Link href="/hogar">
          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-emerald-500/30 rounded-3xl p-6 flex items-center gap-5 active:scale-[0.98] transition-transform shadow-lg shadow-emerald-500/10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-4xl shrink-0">
              🏠
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hogar</h2>
              <p className="text-emerald-300/80 text-sm mt-0.5">Tareas del día y la semana</p>
            </div>
            <span className="ml-auto text-emerald-400 text-xl">›</span>
          </div>
        </Link>
      </div>

      <div className="mt-auto pt-8 flex items-center justify-center gap-3 text-slate-600 text-xs">
        <span>🐱 🐱</span>
        <span>Gatas y Compota</span>
        <span>🐕</span>
      </div>
    </div>
  )
}
