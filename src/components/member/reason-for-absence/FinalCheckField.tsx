'use client'

import { usePathname, useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { useAbsenceStore } from '@/store/member/absenceStore'

import { AbsenceDataType, AbsenceType } from '@/types/member/absence'

import { convertISODateTimeToTime } from '@/utils/common'
import { postAbsence } from '@/lib/member/client/reason-for-absence'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useToast } from '@/components/member/common/toast/ToastContext'
import { extractFileExtension } from '@/utils/upload'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function FinalCheckField() {
  const router = useRouter()
  const pathname = usePathname()

  const absenceData = useAbsenceStore((state) => state.absenceData)
  const selectedSessionContent = useAbsenceStore((state) => state.selectedSessionContent)

  const { uploadFile } = useFileUpload()
  const file = useAbsenceStore((state) => state.file)

  const { error, success } = useToast()

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 참석 유형을 Enum -> Content 으로 변경
   * @param absenceType 'ABSENT': 결석 | 'LATE' : 지각 | 'EARLY_LEAVE' : 조퇴
   */
  const changeAbsenceToContent = (absenceType: AbsenceType | undefined) => {
    switch (absenceType) {
      case 'EARLY_LEAVE':
        return '조퇴'
      case 'ABSENT':
        return '결석'
      case 'LATE':
        return '지각'
      default:
        return ''
    }
  }

  const absenceContent = `${changeAbsenceToContent(absenceData?.submitType)} ${absenceData?.submitType === 'LATE' ? (absenceData.lateDateTime ? convertISODateTimeToTime(absenceData.lateDateTime) : '') : absenceData?.submitType === 'EARLY_LEAVE' ? (absenceData?.leaveDateTime ? convertISODateTimeToTime(absenceData.leaveDateTime) : '') : ''}`

  const handleSubmit = async (absenceData: AbsenceDataType | undefined) => {
    try {
      if (!absenceData) {
        error('불참 정보를 입력해주세요')
        return
      }

      // 1. 먼저 불참 정보 제출
      let fileName = 'test.png'

      if (file) {
        const extension = extractFileExtension(file.name)
        fileName = `absence.${extension}`
      }

      const updatedAbsenceData = {
        ...absenceData,
        ...(fileName && { fileName }),
      }

      const response = await postAbsence(updatedAbsenceData)

      if (!response.success) {
        error(`${response.error || '불참 정보 제출 실패'}`)
        console.error('❌ 불참 정보 제출 실패:', response.error)
        return
      }

      // 2. 파일이 있으면 업로드
      if (file && response.data.data.preSignedUrl) {
        const uploadResult = await uploadFile(file, {
          preSignedUrl: response.data.data.preSignedUrl,
        })

        if (!uploadResult.success) {
          error(`파일 업로드 실패: ${uploadResult.error}`)
          console.error('❌ 파일 업로드 실패:', uploadResult.error)
          return
        }
      }

      // 3. 성공
      // success('✅ 불참 정보가 제출되었습니다')
      handleStepClick('6')
    } catch (err) {
      const msg = err instanceof Error ? err.message : '제출 중 오류 발생'
      error(`❌ 오류: ${msg}`)
      console.error('❌ 제출 중 오류:', err)
    }
  }

  return (
    <div>
      <section className="flex flex-col gap-y-[24px] px-5 pt-[32px]">
        {/* 세션 일시 */}
        <section className="flex flex-col gap-y-3">
          <h2 className="body-lg-semibold">세션 일시</h2>
          <div className="bg-background1 body-lg-medium h-[48px] rounded-[12px] border border-gray-300 px-[14px] py-3 outline-none">
            {selectedSessionContent}
          </div>
        </section>

        {/* 참석 구분 */}
        <section className="flex flex-col gap-y-3">
          <h2 className="body-lg-semibold">참석 구분</h2>
          <div className="bg-background1 body-lg-medium h-[48px] rounded-[12px] border border-gray-300 px-[14px] py-3 outline-none">
            {absenceContent}
          </div>
        </section>

        {/* 사유 */}
        <section className="flex flex-col gap-y-3">
          <h2 className="body-lg-semibold">사유</h2>
          <div className="bg-background1 body-lg-medium h-[122px] rounded-[12px] border border-gray-300 px-[14px] py-3 outline-none">
            {absenceData?.reason}
          </div>
        </section>

        {/* 증빙 서류 */}
        {file && (
          <section className="flex flex-col gap-y-3">
            <h2 className="body-lg-semibold">증빙 서류</h2>
            <div className="bg-background1 body-lg-medium flex h-[48px] w-full gap-x-1 overflow-hidden rounded-[12px] border border-gray-300 px-[14px] py-3 outline-none">
              <p className="line-clamp-1">{file?.name}</p>
              <p className="text-gray-500">{`(${(file.size / 1024 / 1024).toFixed(2)}MB)`}</p>
            </div>
          </section>
        )}
      </section>

      {/* bottom button 크기만큼 h 조절 */}
      <div className="h-[100px]" />

      {/* bottom button */}
      <section className="desktop:w-[375px] fixed bottom-0 w-full bg-white px-5 pb-[60px]">
        <MemberButton
          styleSize={'lg'}
          styleStatus={'default'}
          styleType={'primary'}
          buttonType={'submit'}
          onClick={() => handleSubmit(absenceData)}
        >
          제출하기
        </MemberButton>
      </section>
    </div>
  )
}
