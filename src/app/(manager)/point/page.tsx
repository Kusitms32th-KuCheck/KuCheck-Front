import PointTable from '@/components/manager/point/PointTable'
import PointHeader from '@/components/manager/point/PointHeader'

export default function PointPage() {
  return (
    <main className="flex h-full flex-col overflow-visible">
      <PointHeader />
      <PointTable />
    </main>
  )
}
