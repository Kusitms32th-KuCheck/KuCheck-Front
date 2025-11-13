import CheckTable from '@/components/manager/check-document/CheckTable'
import { getKupicServer } from '@/lib/manager/kupic'
export default async function CheckDocumentPage() {
  const result = await getKupicServer()
  const records = result.data
  return (
    <main className="flex flex-col gap-7 p-6">
      <p className="heading-lg-medium px-2">큐픽 서류 확인</p>
      <CheckTable records={records ?? []} />
    </main>
  )
}
