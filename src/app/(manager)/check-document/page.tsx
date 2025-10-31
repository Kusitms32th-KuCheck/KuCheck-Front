import CheckTable from '@/components/manager/check-document/CheckTable'
import { getKupicServer } from '@/lib/manager/kupic'
export default async function CheckDocumentPage() {
  const result = await getKupicServer()

  if (!result.success) {
    return (
      <main className="flex flex-col gap-7 p-6">
        <p className="heading-lg-medium px-2">큐픽 서류 확인</p>
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
          데이터를 불러오는 데 실패했습니다: {result?.error}
        </div>
      </main>
    )
  }

  const records = result.data

  return (
    <main className="flex flex-col gap-7 p-6">
      <p className="heading-lg-medium px-2">큐픽 서류 확인</p>
      <CheckTable records={records ?? []} />
    </main>
  )
}
