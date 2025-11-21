import CheckTable from '@/components/manager/check-document/CheckTable'

export default function CheckDocumentPage() {
  return (
    <main className="flex flex-col gap-8 px-6 py-9">
      <p className="heading-lg-medium px-2">큐픽 서류 확인</p>
      <CheckTable />
    </main>
  )
}
