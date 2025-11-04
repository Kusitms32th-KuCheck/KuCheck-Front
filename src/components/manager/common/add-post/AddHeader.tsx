'use client'

import SessionHeader from './SessionHeader'
import PostHeader from './PostHeader'

type AddHeaderProps = {
  type: 'session' | 'post'
}

export default function AddHeader({ type }: AddHeaderProps) {
  return (
    <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
      {type === 'session' ? <SessionHeader /> : <PostHeader />}
    </div>
  )
}
