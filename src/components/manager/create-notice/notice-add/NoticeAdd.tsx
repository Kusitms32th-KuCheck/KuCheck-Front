'use client'

import { useEffect, useState } from 'react'
import AddBody from '../../session-schedule/add-post/AddBody'
import PostHeader from './PostHeader'
import { postClientNoticeManage, getClientCategory } from '@/lib/manager/client/notice'
import NoticeAddHeader from './NoticeAddHeader'
import { NoticeCategory } from '@/types/manager/notice/type'
import { postClientNoticeFile } from '@/lib/manager/client/notice'

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

  const uploadFilesAndGetIds = async (files: File[]): Promise<number[]> => {
    const fileIds: number[] = []

    // pdf 확장자만 필터링
    const pdfFiles = files.filter((file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))

    await Promise.all(
      pdfFiles.map(async (file) => {
        const fileType: 'FILE' | 'IMAGE' = 'FILE'
        const res = await postClientNoticeFile(file.name, fileType)
        if (res.success && res.data) {
          fileIds.push(res.data.fileId)
        } else {
          console.error('파일 업로드 실패:', file.name)
        }
      })
    )

    return fileIds
  }

  const handleSubmit = async () => {
    const uploadedFileIds = await uploadFilesAndGetIds(files)
    const response = await postClientNoticeManage({
      title,
      categoryIds: category,
      content,
      fileIds: uploadedFileIds,
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
