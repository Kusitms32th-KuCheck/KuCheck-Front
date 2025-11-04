'use client'

import React, { createContext, useContext, useState } from 'react'

type SessionEditContextValue = {
  isEditing: boolean
  setEditing: (v: boolean) => void
  toggleEdit: () => void
}

const SessionEditContext = createContext<SessionEditContextValue | undefined>(undefined)

export function SessionEditProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((s) => !s)
  return (
    <SessionEditContext.Provider value={{ isEditing, setEditing: setIsEditing, toggleEdit }}>
      {children}
    </SessionEditContext.Provider>
  )
}

export function useSessionEdit() {
  const ctx = useContext(SessionEditContext)
  if (!ctx) throw new Error('useSessionEdit must be used within SessionEditProvider')
  return ctx
}
