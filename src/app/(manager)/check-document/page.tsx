import CheckTable from '@/components/manager/check-document/CheckTable'
import { sampleCheckDocumentRecords } from '@/types/manager/check-document/mockdata'

export default function CheckDocumentPage() {
  return (
    <main className="flex flex-col gap-7 p-6">
      <p className="heading-lg-medium px-2">큐픽 서류 확인</p>
      <CheckTable records={sampleCheckDocumentRecords} totalCount={sampleCheckDocumentRecords.length} />
    </main>
  )
}
