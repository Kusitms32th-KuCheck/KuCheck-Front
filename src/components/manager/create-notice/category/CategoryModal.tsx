'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { ModalXIcon } from '@/assets/svgComponents/manager'
import ColorSelectDropdown from './ColorDropDown'
import {
  MAX_CATEGORY_LENGTH,
  DEFAULT_COLOR,
  getCategoryColorClasses,
  validateCategoryName,
} from '@/utils/manager/notice'
import { getCategoryEditIcon, createColorDropdownOptions } from '@/utils/manager/notice-components'
import { NoticeCategory } from '@/types/manager/notice/type'
import { postClientCategory, putClientCategory, deleteClientCategory } from '@/lib/manager/client/notice'
import BottomToast from '../../common/BottomToast'

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categories: NoticeCategory[]
  onAddCategory: (category: Omit<NoticeCategory, 'id'>) => void
  onDeleteCategory: (categoryId: string) => void
  onEditCategory: (categoryId: string, updatedCategory: Omit<NoticeCategory, 'id'>) => void
}

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  onEditCategory,
}: CategoryModalProps) {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [toastMsg, setToastMsg] = useState('')

  const colorOptions = createColorDropdownOptions()

  const validateCategory = (name: string): string => {
    return validateCategoryName(
      name,
      categories.map((c) => ({ ...c, id: c.id.toString() }))
    )
  }

  // 등록
  const handleAdd = async () => {
    if (newCategoryName.length > 7) {
      setError('최대 7자까지 등록할 수 있어요')
      return
    }
    const err = validateCategory(newCategoryName)
    if (err) {
      if (err.includes('이미 같은 이름의 카테고리가 있어요')) {
        setToastMsg(err)
        setTimeout(() => setToastMsg(''), 2000)
        setError('')
        return
      }
      setError(err)
      return
    }
    if (!newCategoryName.trim() || !selectedColor) return
    const res = await postClientCategory(newCategoryName.trim(), selectedColor)
    if (res.success && res.data) {
      onAddCategory({ name: newCategoryName.trim(), color: selectedColor })
      setNewCategoryName('')
      setSelectedColor(DEFAULT_COLOR)
      setError('')
      setRefreshTrigger((prev) => prev + 1)
    } else {
      if (res.error?.includes('이미 같은 이름의 카테고리가 있어요')) {
        setToastMsg(res.error)
        setTimeout(() => setToastMsg(''), 2000)
        setError('')
      } else {
        setError(res.error || '카테고리 등록 실패')
      }
    }
  }

  const startEdit = (cat: NoticeCategory) => {
    setEditingId(cat.id.toString())
    setEditingName(cat.name)
    setError('')
  }

  // 수정
  const confirmEdit = async () => {
    if (!editingId || !editingName.trim()) return cancelEdit()
    const err = validateCategory(editingName)
    if (err) return setError(err)
    const current = categories.find((c) => c.id.toString() === editingId)
    if (current) {
      const res = await putClientCategory(Number(editingId), editingName.trim(), current.color)
      if (res.success && res.data) {
        onEditCategory(editingId, { name: editingName.trim(), color: current.color })
        setEditingId(null)
        setEditingName('')
        setError('')
        setRefreshTrigger((prev) => prev + 1) // 색상 목록 새로고침
      } else {
        setError(res.error || '카테고리 수정 실패')
      }
    }
    cancelEdit()
  }

  // 삭제
  const handleDeleteCategory = async (id: string) => {
    const res = await deleteClientCategory(Number(id))
    if (res.success) {
      onDeleteCategory(id)
      setRefreshTrigger((prev) => prev + 1)
    } else {
      if (
        res.error?.includes('이미 공지에 등록된 카테고리는 삭제가 불가해요') ||
        res.error?.includes('해당 카테고리로 작성된 공지가 있어 삭제할 수 없습니다.')
      ) {
        setToastMsg(res.error)
        setTimeout(() => setToastMsg(''), 2000)
        setError('')
      } else {
        setError(res.error || '카테고리 삭제 실패')
      }
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName('')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.35)]">
      <div className="h-[620px] min-w-[756px] rounded-[16px] bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">카테고리 편집</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <ModalXIcon width={24} height={24} />
          </button>
        </div>

        {categories.length === 0 && <p className="mb-6 text-center text-sm text-gray-400">카테고리를 등록해 보세요!</p>}

        <div className="mb-5 border-b pb-5">
          <div className="flex flex-wrap gap-3">
            <div className="grid w-full grid-cols-5 gap-3">
              {categories.map((cat) => {
                const isEditing = editingId === cat.id.toString()
                return (
                  <div
                    key={cat.id}
                    className={clsx(
                      'relative flex h-[36px] w-auto min-w-[130px] items-center justify-between rounded-md px-3 text-sm font-medium',
                      getCategoryColorClasses(cat.color),
                      isEditing && 'border-2 border-blue-500'
                    )}
                  >
                    {isEditing ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={confirmEdit}
                        onKeyDown={(e) => e.key === 'Enter' && confirmEdit()}
                        maxLength={MAX_CATEGORY_LENGTH}
                        autoFocus
                        className="w-[130px] bg-transparent text-start outline-none"
                      />
                    ) : (
                      <span className="flex items-center gap-1">
                        {cat.name}
                        <button onClick={() => startEdit(cat)}>{getCategoryEditIcon(cat.color, 16)}</button>
                      </span>
                    )}
                    <button onClick={() => handleDeleteCategory(cat.id.toString())}>
                      <ModalXIcon width={16} height={16} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 새 카테고리 등록 */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-800">새 카테고리 등록</h3>
          <div className="flex items-start gap-3">
            <input
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value)
                if (e.target.value.length > 7) {
                  setError('최대 7자까지 등록할 수 있어요')
                }
              }}
              placeholder="카테고리 이름"
              maxLength={MAX_CATEGORY_LENGTH}
              className={clsx(
                'h-[40px] flex-1 rounded-md border px-3 text-sm transition focus:outline-none',
                error ? 'border-red-500' : 'focus:border-primary-500 border-gray-300'
              )}
            />

            <ColorSelectDropdown
              options={colorOptions}
              selected={selectedColor}
              onChange={setSelectedColor}
              refreshTrigger={refreshTrigger}
            />

            <button
              onClick={handleAdd}
              disabled={!!error || !newCategoryName.trim() || !selectedColor}
              className={clsx(
                'h-[40px] rounded-md px-5 text-sm font-semibold transition-colors',
                !error && newCategoryName.trim() && selectedColor
                  ? 'bg-primary-500 hover:bg-primary-600 text-white'
                  : 'cursor-not-allowed bg-gray-100 text-gray-500'
              )}
            >
              등록
            </button>
          </div>

          {error && <p className="text-sub-red caption-md-medium mt-2 text-sm">{error}</p>}
        </div>
        {toastMsg &&
          (toastMsg.includes('이미 같은 이름의 카테고리가 있어요') ||
            toastMsg.includes('이미 공지에 등록된 카테고리는 삭제가 불가해요') ||
            toastMsg.includes('해당 카테고리로 작성된 공지가 있어 삭제할 수 없습니다.')) && (
            <BottomToast
              className="mb-[25vh]"
              message={
                toastMsg.includes('이미 공지에 등록된 카테고리는 삭제가 불가해요') ||
                toastMsg.includes('해당 카테고리로 작성된 공지가 있어 삭제할 수 없습니다.')
                  ? '이미 공지에 등록된 카테고리는 삭제가 불가해요'
                  : toastMsg
              }
            />
          )}
      </div>
    </div>
  )
}
