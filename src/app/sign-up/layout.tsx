import { Suspense } from 'react' // 1. Suspense import
import MemberHeader from '@/components/member/common/MemberHeader'
import SignUpStepIndicator from '@/components/common/sign-up/SignUpStepIndicator'

interface SignUpLayoutProps {
  children: React.ReactNode
}

/**
 * MemberHeader를 위한 로딩 폴백(Fallback) UI
 * 헤더가 로드되는 동안 레이아웃이 밀리지 않도록 실제 헤더와 유사한 높이를 지정합니다.
 */
function HeaderFallback() {
  return <div className="fixed top-0 z-10 h-[117px] w-full bg-white" />
}

export default async function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <div>
      {/* 훅을 사용하는 컴포넌트를 포함한 MemberHeader를 Suspense로 감싼다. */}
      <Suspense fallback={<HeaderFallback />}>
        <MemberHeader headerType={'dynamic'} rightElement={<SignUpStepIndicator />} />
      </Suspense>

      {/* 헤더의 높이만큼 공간 확보 */}
      <div className="h-[117px]" />

      {children}
    </div>
  )
}
