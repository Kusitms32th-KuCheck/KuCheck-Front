'use client'

import { useState } from 'react'
import AddBody from '../../session-schedule/add-post/AddBody'
import PostHeader from './PostHeader'

export default function NoticeAdd() {
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="mx-auto mt-6 mb-6 w-[854px] space-y-6">
      <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
        <PostHeader files={files} setFiles={setFiles} />
      </div>
      <AddBody content={content} setContent={setContent} />
    </div>
  )
}
