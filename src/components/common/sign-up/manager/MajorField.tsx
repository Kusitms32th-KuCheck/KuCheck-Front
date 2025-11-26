import ManagerInput from '@/components/manager/common/ManagerInput'
import { useSignUpStore } from '@/store/signUpStore'

export default function MajorField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)
  /**
   * 전공 변경 event handler
   */
  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSignUpData({ major: e.target.value })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <section className="flex flex-col gap-y-1">
        <h2 className="body-lg-medium">학과를 입력해주세요</h2>
        <p className="caption-sm-medium text-gray-500">복수 전공이 있다면 함께 작성해 주세요 ex. 큐시즘학과/큐밀리학과</p>
      </section>
      <ManagerInput onChange={handleMajorChange} value={signUpData?.major ?? ''} inputBoxStyle={'default'} placeholder={'학과'} type={'text'} />
    </div>
  )
}
