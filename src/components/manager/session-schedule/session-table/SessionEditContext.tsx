'use client'

import React, { createContext, useContext, useState } from 'react'

type SessionEditContextValue = {
  isEditing: boolean
  setEditing: (v: boolean) => void
  toggleEdit: () => void
  registerSaveHandler: (fn: () => Promise<boolean>) => () => void
  runSaveHandlers: () => Promise<boolean>
  resetToOriginal: React.MutableRefObject<(() => void) | null>
}

const SessionEditContext = createContext<SessionEditContextValue | undefined>(undefined)

export function SessionEditProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((s) => !s)

  const handlersRef = React.useRef<Array<() => Promise<boolean>>>([])

  const registerSaveHandler = (fn: () => Promise<boolean>) => {
    handlersRef.current.push(fn)
    return () => {
      handlersRef.current = handlersRef.current.filter((h) => h !== fn)
    }
  }

  const runSaveHandlers = async () => {
    for (const h of handlersRef.current) {
      try {
        const ok = await h()
        if (!ok) return false
      } catch {
        return false
      }
    }
    return true
  }

  const resetToOriginal = React.useRef<(() => void) | null>(null)
  return (
    <SessionEditContext.Provider
      value={{ isEditing, setEditing: setIsEditing, toggleEdit, registerSaveHandler, runSaveHandlers, resetToOriginal }}
    >
      {children}
    </SessionEditContext.Provider>
  )
}

export function useSessionEdit() {
  const ctx = useContext(SessionEditContext)
  if (!ctx) throw new Error('useSessionEdit must be used within SessionEditProvider')
  return ctx
}
