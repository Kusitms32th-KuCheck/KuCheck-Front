import ImageUploader from '@/components/common/sign-up/manager/ImageUploader'
import { useSignUpStore } from '@/store/signUpStore'
import { extractFileExtension } from '@/utils/upload'
import { getMembersProfileImageUrl } from '@/lib/member/common'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useToast } from '@/components/member/common/toast/ToastContext'
import { postMembersOnboarding } from '@/lib/common'
import { usePathname, useRouter } from 'next/navigation'

type StepType = '1' | '2' | '3' | '4' | '5' | '6' | '7'


export default function ProfileImageUploadField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const file = useSignUpStore((state) => state.file)
  const { uploadFile } = useFileUpload()
  const setFile = useSignUpStore((state) => state.setFile)
  const { error } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    // URL 업데이트 → 서버 컴포넌트 재렌더링
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }
  // ✅ 모든 필드가 채워졌는지 확인하는 함수
  const isFormComplete = () => {
    return (
      signUpData?.name?.trim() &&
      signUpData?.school?.trim() &&
      signUpData?.major?.trim() &&
      signUpData?.part &&
      signUpData?.phoneNumber?.trim()
    )
  }

  const isComplete = isFormComplete()


  const handleSubmit = async () => {
    if (!isFormComplete()) {
      return
    }
    if (!file?.url) {
      error('업로드할 파일을 선택해주세요')
      return
    }

    try {
      const response = await postMembersOnboarding(signUpData)
      if (response.success) {
        const extension = extractFileExtension(file.name)
        const presignedResponse = await getMembersProfileImageUrl(`profileImageUrl.${extension}`)

        if (presignedResponse.error) {
          error(`${presignedResponse.error}`)
        }

        if (!presignedResponse.success || !presignedResponse.data?.data?.newUrl) {
          throw new Error('프리사인드 URL 요청 실패')
        }

        const uploadResult = await uploadFile(file, {
          preSignedUrl: presignedResponse.data.data.newUrl,
        })

        if (!uploadResult.success) {
          throw new Error('파일 업로드 실패')
        }

        console.log('✅ 큐픽 신청서 서류 이미지 업로드 성공:', uploadResult)
        if (uploadResult.success) {
          handleStepClick('7')
          setFile(undefined)
        } else if (uploadResult.error) {
          error(`${uploadResult.error}`)
        }
      } else if (response.error) {
        error(`${response.error}`)
      }
    } catch (error) {
      console.error('❌ 업로드 중 오류:', error)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center gap-y-[60px]">
      <div className="flex flex-col gap-y-4 w-full">
        <section className="flex flex-col gap-y-1">
          <h2 className="body-lg-medium">사진을 업로드해 주세요</h2>
          <p className="caption-sm-medium text-gray-500">
            얼굴은 잘 보이는 사진을 등록해 주세요. 출석 시 본인 확인 용도로만 사용돼요
          </p>
        </section>
        <ImageUploader />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`body-2xl-semibold w-[160px] h-[52px] rounded-[12px] flex items-center justify-center transition-all duration-200 ${
          isComplete
            ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95 cursor-pointer'
            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
        }`}
      >
        완료
      </button>
    </div>
  )
}
