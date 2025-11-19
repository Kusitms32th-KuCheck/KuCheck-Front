'use client'

import { useEffect, useState } from 'react'
import AddBody from '../../session-schedule/add-post/AddBody'
import PostHeader from './PostHeader'
import {
  postClientNoticeManage,
  putClientNoticeManage,
  getClientCategory,
  postClientNoticeFile,
  getClientNoticeDetail,
} from '@/lib/manager/client/notice'
import NoticeAddHeader from './NoticeAddHeader'
import { NoticeCategory } from '@/types/manager/notice/type'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NoticeAdd() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<number[]>([])
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<NoticeCategory[]>([])
  const [existingFileIds, setExistingFileIds] = useState<number[]>([]) // 기존 파일 ID
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('isEditMode') === 'true'
  const noticeId = searchParams.get('noticeId')

  // 1️⃣ 카테고리 조회
  const fetchCategories = async () => {
    const response = await getClientCategory()
    if (response.success && response.data) setCategories(response.data)
    else console.error('❌ Error fetching categories:', response.error)
  }

  // 2️⃣ 기존 공지 내용 조회
  const fetchNoticeDetail = async () => {
    if (isEditMode && noticeId) {
      const res = await getClientNoticeDetail(parseInt(noticeId))
      console.log('Fetched notice detail:', res.data?.content)
      if (res.success && res.data) {
        const notice = res.data
        setTitle(notice.title)
        setContent(notice.content)

        // 기존 카테고리 선택
        if (notice.categories) {
          const selectedIds = notice.categories
            .map((cat) => categories.find((c) => c.name === cat.name)?.id)
            .filter((id): id is number => !!id)
          setCategory(selectedIds)
        }

        // 기존 파일
        if (notice.fileUrls) {
          setExistingFileIds(notice.fileUrls.map((f) => f.id))
        }
      }
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categories.length > 0) fetchNoticeDetail()
  }, [categories])

  // 3️⃣ 파일 업로드
  const uploadFilesAndGetIds = async (files: File[]): Promise<number[]> => {
    const fileIds: number[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      const fileType: 'FILE' | 'IMAGE' = ['png', 'jpg', 'jpeg', 'webp'].includes(ext || '') ? 'IMAGE' : 'FILE'
      const sizeMB = Math.max(1, Math.round(file.size / (1024 * 1024)))

      const presignedRes = await postClientNoticeFile(file.name, fileType, sizeMB)
      if (!presignedRes.success || !presignedRes.data) continue

      const { presignedUrl, fileId } = presignedRes.data
      try {
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })
        if (!uploadRes.ok) throw new Error(`S3 업로드 실패: ${uploadRes.status}`)
        fileIds.push(fileId)
      } catch (err) {
        console.error('S3 업로드 실패:', file.name, err)
      }
    }
    return fileIds
  }

  // 4️⃣ 제출 (등록 / 수정 분기)
  const handleSubmit = async () => {
    const uploadedFileIds = await uploadFilesAndGetIds(files)
    const allFileIds = [...existingFileIds, ...uploadedFileIds]

    if (isEditMode && noticeId) {
      const response = await putClientNoticeManage(parseInt(noticeId), {
        title,
        categoryIds: category,
        content,
        fileIds: allFileIds,
      })
      if (response.success) router.push(`/create-notice/detail/${noticeId}`)
      else console.error('❌ Error updating notice:', response.error)
    } else {
      const response = await postClientNoticeManage({
        title,
        categoryIds: category,
        content,
        fileIds: uploadedFileIds,
      })
      if (response.success && response.data?.id) router.push(`/create-notice/detail/${response.data.id}`)
      else console.error('❌ Error creating notice:', response.error)
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
            selectedCategoryIds={category} // ✅ 선택된 카테고리 표시
            error={false}
          />
        </div>
        <AddBody content={content} setContent={setContent} />
      </div>
    </>
  )
}
