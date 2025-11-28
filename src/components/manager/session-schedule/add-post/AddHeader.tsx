'use client'

import SessionHeader from './SessionHeader'
import { SessionImage } from '@/types/manager/session/type'

type AddHeaderProps = {
  place: string
  setPlace: (v: string) => void
  editImage?: SessionImage[]
  setEditImage?: (images: SessionImage[]) => void
  startTime?: string
  endTime?: string
  setStartTime: (v: string) => void
  setEndTime: (v: string) => void
  date?: string | null
  files?: File[]
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void
  error?: boolean
}

export default function AddHeader({ editImage,setEditImage, files = [], setFiles = () => {}, ...props }: AddHeaderProps) {
  console.log('editImage in AddHeader:', editImage)
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
      <SessionHeader {...props} editImage={editImage} setEditImage={setEditImage} files={files} setFiles={setFiles} error={props.error} />
    </div>
  )
}
