import MemberHeader from '@/components/member/common/MemberHeader'
import NoticeCard from '@/components/member/notice/NoticeCard'

import { SearchIcon } from '@/assets/svgComponents/member'

export default function NoticePage() {
  const menuList = ['기프', '밋업', '좋은정보공유', '홍보']
  return (
    <main className="desktop:w-[375px] min-h-screen bg-white">
      <MemberHeader headerType={'dynamic'} title={'공지사항'} headerColor={'bg-white'} />
      <div className="h-[120px]" />
      <div className="px-5">
        <section className="flex flex-col gap-y-3">
          <SearchBar />
          <div className="flex gap-x-2">
            <div className="body-sm-medium flex h-[28px] items-center justify-center rounded-[30px] bg-gray-800 px-3 text-white">
              전체
            </div>
            {menuList.map((menu) => (
              <div
                className="body-sm-medium flex h-[28px] items-center justify-center rounded-[30px] bg-gray-100 px-3 text-gray-600"
                key={menu}
              >
                {menu}
              </div>
            ))}
          </div>
        </section>
        <section className="">
          <NoticeCard
            id={1}
            title={'이달의 큐픽'}
            content={
              '안녕하세요! 경영총괄팀 사무대관 담당 윤창현입니다 이번 32기의 두 번째 큐픽, 11월의 큐픽이 찾아왔습니다'
            }
            date={'25/11/07'}
            tag={'큐픽'}
            imageUrl={'/ut/UT_01.png'}
          />
          <NoticeCard
            id={3}
            title={'[한글과컴퓨터] 한컴 AI 아카데미 3기 참여자 모집 (~11/12)'}
            content={
              '(스나이퍼팩토리 주관) 안녕하세요 큐밀리 여러분~! 스나이퍼팩토리에서 진행하는 [한글과컴퓨터] 한컴 AI 아카데미 3기 프로그램이 열렸습니다! '
            }
            date={'25/11/03'}
            tag={'홍보'}
            tagStyle={'bg-[#E2F9E7] text-[#14712B]'}
          />
          <NoticeCard
            id={2}
            title={'전시회 제출물 안내'}
            content={
              '구글폼을 통해 X배너 및 포스터 파일을 제출해주시기 바랍니다.[KUSITMS 32nd 전체 노션]에서[팀별 스페이스]에 접속 후 전시 부스 운영 계획서 페이지에 내용을 채워주시기 바랍니다.'
            }
            date={'25/11/01'}
            tag={'밋업프로젝트'}
            tagStyle={'bg-[#FEE5FE] text-[#F45AD5]'}
          />
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
