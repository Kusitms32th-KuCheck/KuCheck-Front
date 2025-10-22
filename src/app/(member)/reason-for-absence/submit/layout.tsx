import AbsenceHeader from '@/components/member/reason-for-absence/AbsenceHeader'

export default function ReasonForAbsenceSubmitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AbsenceHeader />
      {children}
    </div>
  )
}
