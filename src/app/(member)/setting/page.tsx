import MemberHeader from '@/components/member/common/MemberHeader'
import EtcContainer from '@/components/member/setting/EtcContainer'
import AccountSettingContainer from '@/components/member/setting/AccountSettingContainer'
import TermsOfServiceContainer from '@/components/member/setting/TermsOfServiceContainer'
import ProfileContainer from '@/components/member/setting/ProfileContainer'

export default async function SettingPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen w-full bg-white">
        <MemberHeader headerType="dynamic" title={'설정'} />
        <div className="h-[116px]" />
        <div className="mt-3">
          <ProfileContainer />
          <TermsOfServiceContainer />
          <AccountSettingContainer />
          <EtcContainer />
        </div>
      </div>
    </main>
  )
}
