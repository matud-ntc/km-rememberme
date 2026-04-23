import type { Metadata, Viewport } from 'next'
import './globals.css'
import { getUsers } from '@/lib/actions'
import { UserProvider } from '@/components/user-provider'
import { UserSelector } from '@/components/user-selector'
import { BottomNav } from '@/components/bottom-nav'
import { SwRegister } from '@/components/sw-register'

export const metadata: Metadata = {
  title: 'RememberMe',
  description: 'Listas del hogar para los dos',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'RememberMe' },
}

export const viewport: Viewport = {
  themeColor: '#0a0b10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers()

  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#0a0b10] text-slate-100 max-w-lg mx-auto relative">
        <SwRegister />
        <UserProvider initialUsers={users}>
          <UserSelector />
          <main className="pb-24">{children}</main>
          <BottomNav />
        </UserProvider>
      </body>
    </html>
  )
}
