import ManagerInput from '@/components/manager/common/ManagerInput'
import { useSignUpStore } from '@/store/signUpStore'
import { formatPhoneNumber } from '@/utils/common'

export default function PhoneNumberField() {
  const signUpData = useSignUpStore((state) => state.signUpData)
  const updateSignUpData = useSignUpStore((state) => state.updateSignUpData)

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    updateSignUpData({ phoneNumber: formatted })
  }

  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="body-lg-medium">휴대폰 번호를 입력해 주세요</h2>
      <ManagerInput onChange={(e) => handlePhoneNumberChange(e)} value={signUpData?.phoneNumber ?? ''} inputBoxStyle={'default'} placeholder={'휴대폰 번호'} type={'text'} />
    </section>
  )
}
