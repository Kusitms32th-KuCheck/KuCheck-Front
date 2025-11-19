'use client'

import { useEffect, useState } from 'react'
import AddBody from '../../session-schedule/add-post/AddBody'
import PostHeader from './PostHeader'
import { postClientNoticeManage, getClientCategory } from '@/lib/manager/client/notice'
import NoticeAddHeader from './NoticeAddHeader'
import { NoticeCategory } from '@/types/manager/notice/type'
import { postClientNoticeFile } from '@/lib/manager/client/notice'
import { useRouter } from 'next/navigation'

export default function NoticeAdd() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<number[]>([])
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<NoticeCategory[]>([])
  const router = useRouter()

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

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      const fileType: 'FILE' | 'IMAGE' = ['png', 'jpg', 'jpeg', 'webp'].includes(ext || '') ? 'IMAGE' : 'FILE'
      // MB 단위, 정수로 변환
      const sizeMB = Math.max(1, Math.round(file.size / (1024 * 1024)))

      const presignedRes = await postClientNoticeFile(file.name, fileType, sizeMB)
      if (!presignedRes.success || !presignedRes.data) {
        console.error('프리사인드 URL 발급 실패:', file.name)
        continue
      }

      const { presignedUrl, fileId } = presignedRes.data

      try {
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })

        if (!uploadRes.ok) throw new Error(`S3 업로드 실패: ${uploadRes.status}`)

        fileIds.push(fileId)
        console.log('파일 업로드 성공:', file.name)
      } catch (err) {
        console.error('S3 업로드 실패:', file.name, err)
      }
    }

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
      if (response.data?.id) {
        router.push(`/create-notice/detail/${response.data.id}`)
      }
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
