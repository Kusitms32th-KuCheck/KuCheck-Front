import NoticeDetail from '@/components/manager/create-notice/notice-detail/NoticeDetail'
import { getServerNoticeDetail } from '@/lib/manager/notice'

export default async function CreateNoticeDetailPage(params: { params: { id: number } }) {
  const { id } = await params.params
  const { data, error } = await getServerNoticeDetail(id)
  console.log(data)
  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>Notice not found</div>
  }

  return (
    <main className="flex h-full flex-col overflow-visible">
      <NoticeDetail {...data} />
    </main>
  )
}
