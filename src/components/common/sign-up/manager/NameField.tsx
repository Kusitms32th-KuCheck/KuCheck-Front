import ManagerInput from '@/components/manager/common/ManagerInput'
import { useSignUpStore } from '@/store/signUpStore'
import { useCallback } from 'react'

export default function NameField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)

  /**
   * 이름 변경 event handler
   * ✅ 올바른 store 업데이트
   */
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value

      // ✅ updateSignUpData로 올바르게 업데이트
      updateSignUpData({ name: newName })
    },
    [updateSignUpData]
  )


  return (
    <div className="flex flex-col gap-y-4">
      <section className="flex flex-col gap-y-1">
        <h2 className="body-lg-medium">이름을 입력해주세요</h2>
        <p className="caption-sm-medium text-gray-500">성까지 포함한 이름을 입력해 주세요</p>
      </section>
      <ManagerInput value={signUpData?.name ?? ''} onChange={(e) => handleNameChange(e)} inputBoxStyle={'default'} placeholder={'이름'} type={'text'} />
    </div>
  )
}
