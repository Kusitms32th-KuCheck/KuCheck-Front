import Link from 'next/link'
import MemberHeader from '@/components/member/common/MemberHeader'
import NoticeCategories from '@/components/member/notice/NoticeCategories'

import { SearchIcon } from '@/assets/svgComponents/member'
import { getNoticeCategories } from '@/lib/member/server/notice'
import NoticeList from '@/components/member/notice/NoticeList'

export default async function NoticePage() {
  const noticeCategoriesResponse = await getNoticeCategories()
  const noticeCategories = noticeCategoriesResponse.data

  return (
    <main className="desktop:w-[375px] flex min-h-screen flex-col bg-white">
      <MemberHeader
        headerType={'dynamic'}
        title={'공지사항'}
        headerColor={'bg-white'}
        rightElement={
          <Link href={'/notice/search'} className="absolute right-5">
            <SearchIcon width={24} height={24} />
          </Link>
        }
      />
      <div className="h-[70px]" />
      {/*<div className="h-[120px]" />*/}
      <div className="flex flex-1 flex-col px-5">
        <NoticeCategories noticeCategories={noticeCategories} />
        <NoticeList />
      </div>
    </main>
  )
}
