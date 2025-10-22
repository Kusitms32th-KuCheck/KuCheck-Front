import MemberHeader from '@/components/member/common/MemberHeader'
import { HelpCircleIcon } from '@/assets/svgComponents/member'

export default function ReasonForAbsenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MemberHeader
        headerType={'dynamic'}
        title={'불참 사유서'}
        rightElement={<HelpCircleIcon className="absolute right-5" width={20} height={20} />}
      />
      {/* 헤더의 높이만큼 공간 확보 */}
      <div className="h-[117px]" />
      {children}
    </div>
  )
}
