import MemberHeader from '@/components/member/common/MemberHeader'
import SignUpStepIndicator from '@/components/common/sign-up/SignUpStepIndicator'

interface SignUpLayoutProps {
  children: React.ReactNode
}

export default async function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <div>
      <MemberHeader headerType={'dynamic'} rightElement={<SignUpStepIndicator />} />
      <div className="h-[117px]" />
      {children}
    </div>
  )
}
