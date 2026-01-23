'use client'

import { useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import heic2any from 'heic2any'

import { CancelIcon, PlusCircleIcon } from '@/assets/svgComponents/member'

import MemberButton from '@/components/member/common/MemberButton'

import { useAbsenceStore } from '@/store/member/absenceStore'

import { convertFileToFileInfo, isValidFile } from '@/utils/upload'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function ProofDocumentUpload() {
  const router = useRouter()
  const pathname = usePathname()

  const fileRef = useRef<HTMLInputElement>(null)
  const file = useAbsenceStore((state) => state.file)
  const setState = useAbsenceStore((state) => state.setState)
  const [isConverting, setIsConverting] = useState(false)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * HEIC를 JPEG으로 변환
   */
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9,
      })

      const convertedFile = new File(
        [convertedBlob as Blob],
        file.name.replace(/\.heic$/i, '.jpg'),
        { type: 'image/jpeg' }
      )

      return convertedFile
    } catch (err) {
      console.error('HEIC 변환 실패:', err)
      throw new Error('HEIC 파일 변환에 실패했습니다. 다시 시도해주세요.')
    }
  }

  /**
   * 파일 선택 처리 (유효성 검사 포함)
   */
  const handleFileSelect = async () => {
    const files = fileRef.current?.files

    if (files && files.length > 0) {
      let selectedFile = files[0]

      try {
        setIsConverting(true)

        // HEIC 파일 변환 처리
        if (
          selectedFile.type === 'image/heic' ||
          selectedFile.type === 'image/heif' ||
          selectedFile.name.toLowerCase().endsWith('.heic')
        ) {
          selectedFile = await convertHeicToJpeg(selectedFile)
        }

        // 변환된 파일 유효성 검사
        const validation = isValidFile(selectedFile)

        if (!validation.valid) {
          alert(validation.error)
          if (fileRef.current) {
            fileRef.current.value = ''
          }
          return
        }

        const fileInfo = await convertFileToFileInfo(selectedFile)

        setState({
          file: fileInfo,
        })
      } catch (err) {
        alert((err as Error).message)
        if (fileRef.current) {
          fileRef.current.value = ''
        }
      } finally {
        setIsConverting(false)
      }
    }
  }

  /**
   * 파일 삭제
   */
  const handleRemoveFile = () => {
    setState({
      file: undefined,
    })
  }

  return (
    <div>
      <section className="px-5 pt-[32px]">
        {file ? (
          <section className="flex h-[48px] items-center justify-between rounded-[8px] border border-gray-200 bg-gray-100 px-3">
            <div className="flex gap-x-2">
              <p className="body-lg-medium">{file.name.length > 15 ? `${file.name.slice(0, 20)} ...` : file.name}</p>
              <p className="body-lg-regular text-gray-500">{`(${(file.size / 1024 / 1024).toFixed(2)}MB)`}</p>
            </div>
            <CancelIcon
              onClick={handleRemoveFile}
              width={14}
              height={14}
              style={{ cursor: 'pointer' }}
            />
          </section>
        ) : (
          <section
            onClick={() => !isConverting && fileRef.current?.click()}
            className="flex h-[160px] flex-col items-center justify-center gap-y-[21px] rounded-[8px] border border-gray-200 bg-gray-100 cursor-pointer transition-colors hover:bg-gray-200 disabled:opacity-50"
            style={{ pointerEvents: isConverting ? 'none' : 'auto', opacity: isConverting ? 0.6 : 1 }}
          >
            {isConverting ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : (
              <>
                <PlusCircleIcon width={32} height={32} />
                <p className="caption-sm-medium text-gray-400">파일은 최대 10MB 이하까지만 첨부할 수 있어요</p>
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,.heic,application/pdf"
              id="input-file"
              ref={fileRef}
              name="input-file"
              onChange={handleFileSelect}
              disabled={isConverting}
              className="hidden"
            />
          </section>
        )}
      </section>

      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[60px]">
        <MemberButton
          onClick={() => {
            handleStepClick('5')
          }}
        >
          다음
        </MemberButton>
      </section>
    </div>
  )
}
