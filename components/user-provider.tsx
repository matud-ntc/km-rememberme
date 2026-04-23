'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface UserData {
  id: string
  name: string
  emoji: string
  color: string
}

interface UserContextType {
  currentUser: UserData | null
  setCurrentUser: (user: UserData | null) => void
  users: UserData[]
  setUsers: (users: UserData[]) => void
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  users: [],
  setUsers: () => {},
})

export function UserProvider({
  children,
  initialUsers,
}: {
  children: React.ReactNode
  initialUsers: UserData[]
}) {
  const [users, setUsers] = useState<UserData[]>(initialUsers)
  const [currentUser, setCurrentUserState] = useState<UserData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('km_current_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserData
        const found = initialUsers.find((u) => u.id === parsed.id)
        if (found) setCurrentUserState(found)
      } catch {}
    }
  }, [initialUsers])

  const setCurrentUser = (user: UserData | null) => {
    setCurrentUserState(user)
    if (user) {
      localStorage.setItem('km_current_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('km_current_user')
    }
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
