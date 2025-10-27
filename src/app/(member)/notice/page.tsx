import MemberHeader from '@/components/member/common/MemberHeader'
import NoticeCard from '@/components/member/notice/NoticeCard'

import { SearchIcon } from '@/assets/svgComponents/member'

export default function NoticePage() {
  const menuList = ['기프', '밋업', '좋은정보공유', '홍보']
  return (
    <main>
      <MemberHeader headerType={'dynamic'} title={'공지사항'} />
      <div className="h-[120px]" />
      <div className="px-5">
        <section className="flex flex-col gap-y-3">
          <SearchBar />
          <div className="flex gap-x-2">
            <div className="body-sm-semibold flex h-[28px] items-center justify-center rounded-[30px] bg-gray-800 px-3 text-white">
              전체
            </div>
            {menuList.map((menu) => (
              <div
                className="body-sm-semibold flex h-[28px] items-center justify-center rounded-[30px] bg-gray-100 px-3 text-gray-600"
                key={menu}
              >
                {menu}
              </div>
            ))}
          </div>
        </section>
        <section className="">
          <NoticeCard />
          <NoticeCard />
          <NoticeCard />
          <NoticeCard />
          <NoticeCard />
        </section>
      </div>
    </main>
  )
}

function SearchBar() {
  return (
    <div className="bg-background2 flex h-[40px] w-full items-center gap-x-2 rounded-full px-3">
      <SearchIcon width={24} height={24} />
      <input
        className="body-sm-regular w-full text-black outline-none placeholder:text-gray-500"
        placeholder="공지를 검색해보세요"
      ></input>
    </div>
  )
}
