'use client'

import SessionHeader from './SessionHeader'
import PostHeader from './PostHeader'

type AddHeaderProps = {
  type: 'session' | 'post'
  place: string
  setPlace: (v: string) => void
  setStartTime: (v: string) => void
  setEndTime: (v: string) => void
  date?: string | null
}

export default function AddHeader({ type, ...props }: AddHeaderProps) {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
      {type === 'session' ? <SessionHeader {...props} /> : <PostHeader />}
    </div>
  )
}
