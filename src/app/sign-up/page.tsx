import { SearchParams } from '@/types/common'

import NameField from '@/components/common/sign-up/NameField'
import PhoneNumberField from '@/components/common/sign-up/PhoneNumberField'
import SchoolField from '@/components/common/sign-up/SchoolField'
import MajorField from '@/components/common/sign-up/MajorField'
import PartField from '@/components/common/sign-up/PartField'
import StudentCardUploadField from '@/components/common/sign-up/StudentCardUploadField'

type StepType = '1' | '2' | '3' | '4' | '5' | '6'

export default async function SignUpPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const step = (params.step as StepType) || '1' // 기본값

  return (
    <main>
      {step === '1' && <NameField />}
      {step === '2' && <PhoneNumberField />}
      {step === '3' && <SchoolField />}
      {step === '4' && <MajorField />}
      {step === '5' && <PartField />}
      {step === '6' && <StudentCardUploadField />}
    </main>
  )
}
