// 👈 이 한 줄 추가 - 전체 앱을 동적으로 렌더링
export const dynamic = 'force-dynamic'
export default function SettingLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
