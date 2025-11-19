'use client'

import { useEffect, useState } from 'react'
import { NoticePlusIcon, NoticeTagIcon } from '@/assets/svgComponents/manager'
import ManagerButton from '../../common/ManagerButton'
import CategoryModal from '../category/CategoryModal'
import { useRouter } from 'next/navigation'
import { getClientCategory } from '@/lib/manager/client/notice'
import { NoticeCategory } from '@/types/manager/notice/type'

export default function CreateNoticeHeader() {
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [categories, setCategories] = useState<NoticeCategory[]>([])
  const router = useRouter()

  // 카테고리 조회
  const fetchCategories = async () => {
    const response = await getClientCategory()
    if (response.success && response.data) setCategories(response.data)
    else console.error('❌ Error fetching categories:', response.error)
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  //스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return

      const currentScroll = mainContent.scrollTop
      setShowStickyHeader(currentScroll > 0)
    }

    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
      return () => mainContent.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 카테고리 추가
  const handleAddCategory = async (newCategory: Omit<NoticeCategory, 'id'>) => {
    const { postClientCategory } = await import('@/lib/manager/client/notice')
    await postClientCategory(newCategory.name, newCategory.color)
    fetchCategories()
  }

  // 카테고리 삭제
  const handleDeleteCategory = async (categoryId: string) => {
    const { deleteClientCategory } = await import('@/lib/manager/client/notice')
    await deleteClientCategory(Number(categoryId))
    fetchCategories()
  }

  // 카테고리 수정
  const handleEditCategory = async (categoryId: string, updatedCategory: Omit<NoticeCategory, 'id'>) => {
    const { putClientCategory } = await import('@/lib/manager/client/notice')
    await putClientCategory(Number(categoryId), updatedCategory.name, updatedCategory.color)
    fetchCategories()
  }

  const HeaderContent = () => (
    <>
      <p className="heading-lg-medium">공지 등록</p>
      <div className="flex gap-[11px]">
        <button
          className={`body-sm-medium flex cursor-pointer items-center gap-[6px] rounded-[4px] ${showStickyHeader ? 'bg-background2' : 'bg-white'} px-3 py-2 text-gray-600 hover:bg-[#FAFAFA]`}
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <NoticeTagIcon width={16} height={16} />
          카테고리 편집
        </button>

        <ManagerButton onClick={() => router.push('/create-notice/add')} styleSize="sm">
          <NoticePlusIcon width={16} height={16} />
          공지 등록하기
        </ManagerButton>
      </div>
    </>
  )

  return (
    <>
      {showStickyHeader && (
        <div
          className="fixed top-[68px] right-0 left-[240px] z-50 flex h-[100px] items-center justify-between bg-white px-6 transition-all duration-300"
          style={{
            boxShadow: '4px 4px 13px -6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <HeaderContent />
        </div>
      )}

      <div className="flex flex-row items-center justify-between px-6 pt-8">
        <HeaderContent />
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={handleEditCategory}
      />
    </>
  )
}
