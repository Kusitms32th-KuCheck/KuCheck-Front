import CreateNoticeHeader from '@/components/manager/create-notice/notice-list/CreateNoticeHeader'
import CreateNoticeBody from '@/components/manager/create-notice/notice-list/CreateNoticeBody'

export default function CreateNoticePage() {
  return (
    <main className="flex h-full flex-col gap-7 overflow-visible">
      <CreateNoticeHeader />
      <CreateNoticeBody />
    </main>
  )
}
