import { useSignUpStore } from '@/store/signUpStore'
import { PartType } from '@/types/sign-up'

export default function PartField() {
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)
  const signUpData = useSignUpStore((state) => state.signUpData)
  const partList: { partName: string; partEnum: PartType }[] = [
    { partName: '기획', partEnum: 'PLANNING' },
    { partName: '디자인', partEnum: 'DESIGN' },
    { partName: '프론트엔드', partEnum: 'FRONTEND' },
    { partName: '백엔드', partEnum: 'BACKEND' },
  ]

  /**
   * 파트 변경 event handler
   */
  const handlePartChange = (partEnum: PartType) => {
    updateSignUpData({ part: signUpData?.part === partEnum ? undefined : partEnum })
  }

  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="body-lg-medium">파트를 선택해 주세요</h2>
      <div className="flex gap-x-4">
        {partList.map((part) => (

          <button key={part.partEnum}  onClick={() => handlePartChange(part.partEnum)} type='button' className={`${signUpData?.part === part.partEnum ? "border-primary-500 bg-primary-50" : ' border-gray-200 bg-background1'} body-lg-regular py-3 px-6 rounded-[8px] border`}>{part.partName}</button>
      ))}
    </div>
</section>
)
}
