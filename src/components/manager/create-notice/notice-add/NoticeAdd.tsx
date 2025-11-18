'use client'

import { useEffect, useState } from 'react'
import AddBody from '../../session-schedule/add-post/AddBody'
import PostHeader from './PostHeader'
import { postClientNoticeManage, getClientCategory } from '@/lib/manager/client/notice'
import NoticeAddHeader from './NoticeAddHeader'
import { NoticeCategory } from '@/types/manager/notice/type'

export default function NoticeAdd() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<number[]>([])
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<NoticeCategory[]>([])

  //카테고리조회
  const fetchCategories = async () => {
    const response = await getClientCategory()
    if (response.success && response.data) {
      setCategories(response.data)
    } else {
      console.error('❌ Error fetching categories:', response.error)
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async () => {
    const response = await postClientNoticeManage({
      title,
      categoryIds: category,
      content,
    })
    if (response.success) {
      console.log('✅ Notice created successfully:', response.data)
    } else {
      console.error('❌ Error creating notice:', response.error)
    }
  }

  return (
    <>
      <NoticeAddHeader handleSubmit={handleSubmit} />
      <div className="mx-auto mt-6 mb-6 w-[854px] space-y-6">
        <div className="w-full space-y-6 rounded-2xl bg-white px-6 pt-6">
          <PostHeader
            title={title}
            setTitle={setTitle}
            setCategory={setCategory}
            files={files}
            setFiles={setFiles}
            categories={categories}
            error={false}
          />
        </div>
        <AddBody content={content} setContent={setContent} />
      </div>
    </>
  )
}
