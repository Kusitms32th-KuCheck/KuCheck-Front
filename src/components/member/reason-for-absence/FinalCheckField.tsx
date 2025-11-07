'use client'

import { usePathname, useRouter } from 'next/navigation'

import MemberButton from '@/components/member/common/MemberButton'

import { useAbsenceStore } from '@/store/member/absenceStore'

import { AbsenceDataType, AbsenceType } from '@/types/member/absence'

import { convertISODateTimeToTime } from '@/utils/common'
import { postAbsence } from '@/lib/member/client/reason-for-absence'
import { useFileUpload } from '@/hooks/useFileUpload'
import { extractFileExtension } from '@/utils/upload'
import { useToast } from '@/components/member/common/toast/ToastContext'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default function FinalCheckField() {
  const router = useRouter()
  const pathname = usePathname()

  // post data
  const absenceData = useAbsenceStore((state) => state.absenceData)
  const selectedSessionContent = useAbsenceStore((state) => state.selectedSessionContent)

  // file upload
  const { uploadFile } = useFileUpload()
  const file = useAbsenceStore((state) => state.file)

  const { error } = useToast()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
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

  // 참석 유형 content, (유형 + 시간)
  const absenceContent = `${changeAbsenceToContent(absenceData?.submitType)} ${absenceData?.submitType === 'LATE' ? (absenceData.lateDateTime ? convertISODateTimeToTime(absenceData.lateDateTime) : '') : absenceData?.submitType === 'EARLY_LEAVE' ? (absenceData?.leaveDateTime ? convertISODateTimeToTime(absenceData.leaveDateTime) : '') : ''}`

  // 제출 핸들러
  const handleSubmit = async (absenceData: AbsenceDataType | undefined) => {
    try {
      if (!absenceData) {
        error('불참 정보를 입력해주세요')
        console.error('불참 정보를 입력해주세요')
        return
      }

      if (file) {
        const updatedAbsenceData = {
          ...absenceData,
          fileName: `absence.${extractFileExtension(file.url)}`,
        }

        // 3️⃣ 불참 정보 제출
        const response = await postAbsence(updatedAbsenceData)
        console.log('✅ postAbsence 결과:', response)

        const uploadResult = await uploadFile(file, { preSignedUrl: response.data.data.preSignedUrl })
        console.log('📁 사진 업로드 결과:', uploadResult)

        if (uploadResult.error) {
          error(`${uploadResult.error}`)
        }

        if (!uploadResult.success) {
          error(`${uploadResult.error}`)
          console.error('❌ 파일 업로드 실패:', uploadResult.error)
          return
        }

        if (response.success) {
          handleStepClick('6')
        } else {
          error(`${response.error}`)
          console.error('❌ 불참 정보 제출 실패:', response.error)
        }
      }
      // 1️⃣ 파일 업로드
    } catch (error) {
      console.error('❌ 제출 중 오류 발생:', error)
      // toast 또는 alert으로 사용자에게 알림
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
