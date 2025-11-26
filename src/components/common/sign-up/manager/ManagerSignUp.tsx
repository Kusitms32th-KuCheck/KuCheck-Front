import NameField from '@/components/common/sign-up/manager/NameField'
import PhoneNumberField from '@/components/common/sign-up/manager/PhoneNumberField'
import SchoolField from '@/components/common/sign-up/manager/SchoolField'
import MajorField from '@/components/common/sign-up/manager/MajorField'
import PartField from '@/components/common/sign-up/manager/PartField'
import ProfileImageUploadField from '@/components/common/sign-up/manager/ProfileImageUploadField'
import { useEffect } from 'react'
import { useSignUpStore } from '@/store/signUpStore'

export default function ManagerSignUp() {
  const signUpData = useSignUpStore((state) => state.signUpData)

  useEffect(() => {
    console.log('signUpData', signUpData)
  }, [signUpData])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background2">
      <div className="bg-white flex flex-col w-[813px] px-[46px] py-[41px] rounded-[12px] mb-[100px]">
        <h1 className="heading-1xl-semibold">회원가입</h1>
        <div className="mt-[40px] flex flex-col gap-y-[44px]">
          <NameField />
          <PhoneNumberField />
          <SchoolField />
          <MajorField />
          <PartField />
          <ProfileImageUploadField />
        </div>
      </div>
    </div>
  )
}
