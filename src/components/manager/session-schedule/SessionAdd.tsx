'use client'

import { useState } from 'react'
import SessionAddForm from './SessionAddForm'
import SessionAddTable from './SessionAddTable'

export default function SessionAdd() {
  const [weeks, setWeeks] = useState<number | null>(null)
  const [firstDate, setFirstDate] = useState<string>('')

  const handleGenerate = (w: number, d: string) => {
    setWeeks(w)
    setFirstDate(d)
  }

  return (
    <div className="flex w-full justify-center gap-6 px-6 pt-7 pb-6">
      <SessionAddForm initialDate={firstDate} onGenerate={handleGenerate} />
      <SessionAddTable weeks={weeks} firstDate={firstDate} />
    </div>
  )
}
