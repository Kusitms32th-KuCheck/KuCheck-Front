import CreateNoticeHeader from '@/components/manager/create-notice/CreateNoticeHeader'
import CreateNoticeBody from '@/components/manager/create-notice/CreateNoticeBody'

export default function CreateNoticePage() {
  return (
    <main className="flex h-full flex-col gap-7 overflow-visible">
      <CreateNoticeHeader />
      <CreateNoticeBody />
    </main>
  )
}
