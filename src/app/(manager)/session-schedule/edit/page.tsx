import SessionEditTable from '@/components/manager/session-schedule/SessionEditTable'
export default function SessionEditPage() {
  return (
    <main className="flex w-full overflow-visible">
      <SessionEditTable weeks={12} firstDate="2023-08-09" />
    </main>
  )
}
