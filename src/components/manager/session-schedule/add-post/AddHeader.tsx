'use client'

import SessionHeader from './SessionHeader'

type AddHeaderProps = {
  place: string
  setPlace: (v: string) => void
  startTime?: string
  endTime?: string
  setStartTime: (v: string) => void
  setEndTime: (v: string) => void
  date?: string | null
  files?: File[]
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void
}

export default function AddHeader({ files = [], setFiles = () => {}, ...props }: AddHeaderProps) {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
      <SessionHeader {...props} files={files} setFiles={setFiles} />
    </div>
  )
}
