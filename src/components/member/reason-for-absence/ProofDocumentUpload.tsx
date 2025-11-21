'use client'

import { useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

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

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 파일 선택 처리 (유효성 검사 포함)
   */
  const handleFileSelect = async () => {
    const files = fileRef.current?.files

    if (files && files.length > 0) {
      const file = files[0]

      const validation = isValidFile(file)

      if (!validation.valid) {
        alert(validation.error)
        if (fileRef.current) {
          fileRef.current.value = ''
        }
        return
      }

      const fileInfo = await convertFileToFileInfo(file)

      setState({
        file: fileInfo,
      })
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
            <CancelIcon onClick={handleRemoveFile} width={14} height={14} />
          </section>
        ) : (
          <section
            onClick={() => fileRef.current?.click()}
            className="flex h-[160px] flex-col items-center justify-center gap-y-[21px] rounded-[8px] border border-gray-200 bg-gray-100"
          >
            <PlusCircleIcon width={32} height={32} />
            <p className="caption-sm-medium text-gray-400">파일은 최대 10MB 이하까지만 첨부할 수 있어요</p>
            <div className="relative hidden cursor-pointer">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,application/pdf"
                id="input-file"
                ref={fileRef}
                name="input-file"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
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
