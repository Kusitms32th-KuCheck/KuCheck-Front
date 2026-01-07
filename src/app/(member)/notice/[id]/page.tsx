import MemberHeader from '@/components/member/common/MemberHeader'
import { getNoticeDetail } from '@/lib/member/server/notice'
import SessionContent from '@/components/member/session/SessionContent'
import FileItem from '@/components/member/notice/FileItem'
import Image from 'next/image'
import ImageContainer from '@/components/member/notice/ImageContainer'

interface NoticeDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NoticeDetail({ params }: NoticeDetailPageProps) {
  const { id } = await params
  const response = await getNoticeDetail(Number(id))
  const noticeData = response.data

  if (!noticeData) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <div className="desktop:w-[375px] bg-white relative min-h-screen w-full">
        {/* 헤더 */}
        <MemberHeader headerType="dynamic" title={'공지'} headerColor={'bg-white'} isBottomBorder={true} />

        {/* 헤더 높이 공간 */}
        <div className="h-[116px]" />


        {/* 콘텐츠 */}
        <div className="mt-[12px] px-5 pb-[145px]">
          {/* 제목 & 날짜 */}
          <section className="flex flex-col gap-y-[3px] pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">{noticeData.title}</p>
            <p className="body-sm-regular text-gray-400">{noticeData.createdAt}</p>
          </section>

          {/* 본문 내용 */}
          <SessionContent content={noticeData.content} />

          {/* 파일 */}
          {noticeData.fileUrls && noticeData.fileUrls.length > 0 && (
            <section className="my-[23px] flex flex-col gap-y-2">
              {noticeData.fileUrls.map((file) => (
                <FileItem key={file.id} fileUrl={file.url} fileSize={file.size}/>
              ))}
            </section>
          )}

          {/* 이미지 */}
          <ImageContainer noticeData={noticeData} />
        </div>
      </div>
    </div>
  )
}
