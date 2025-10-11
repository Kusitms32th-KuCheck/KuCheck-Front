import MemberHeader from '@/components/member/common/MemberHeader'

export default function NoticeDetailPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'세션 공지'} />
        <div className="h-[116px]" />
        <div className="px-5 pb-[145px]">
          <section className="flex flex-col gap-y-[3px] border-b border-gray-100 pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">🔊 아이디어 발표 & 커피챗 세션 ☕</p>
            <p className="body-sm-regular text-gray-400">9월 22일 19:00</p>
          </section>
          <section className="my-[23px] flex flex-col gap-y-[6px]">
            <div className="bg- bg-primary-50 flex h-[48px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500">장소</p>
              <p className="body-sm-medium">마루 180 이벤트홀 지하 1층</p>
            </div>
            <div className="bg- bg-primary-50 flex h-[48px] items-center gap-x-[10px] rounded-[12px] pr-[10px] pl-4">
              <p className="body-sm-medium text-primary-500">일시</p>
              <p className="body-sm-medium">9월 27일(토) 12:00 - 17:10</p>
            </div>
          </section>
          <p>
            안녕하세요. 학회원 여러분! 교육기획팀입니다. 이번 주 토요일에는 아이디어 발표 & 커피챗 세션이 진행됩니다.
            🎤🌟
            <br />
            <br />
            이번 세션은 추후 진행 될 밋업 프로젝트의 아이디어 후보군 9개를 공유하고, 학회원들이 원하는 아이디어에 지원할
            수 있도록 돕는 팀빌딩 프로세스의 첫 단계입니다! 각 발제자분들의 아이디어를 공유하고, 학회원들은 파트별로
            소그룹 대화를 나누며 깊이 있는 피드백을 나눌 수 있습니다.
          </p>
          <section className="my-[15px]">
            <p className="body-sm-medium text-primary-500 py-[5px]">📁 팀 빌딩 결과.pdf</p>
            <p className="body-sm-medium text-primary-500 py-[5px]">🔗 지원서 가이드라인 링크</p>
            <p className="body-sm-medium text-primary-500 py-[5px]">🔗 발제된 9개 아이디어 확인</p>
          </section>

          <p>
            ☕ 커피챗 운영 방식
            <br />
            <br />
            커피챗은 파트별(기획, 디자인, 프론트엔드, 백엔드)로 구성되며, 각 파트별 8명 기준, 2개 조로 나누어
            운영됩니다. 한 조당 15분씩 발제자들이 학회원 테이블을 이동하며 대화를 나누는 방식입니다. 궁금하신 사항이
            있으시면 자유롭게 발제자께 질문해주세요!
          </p>
          <div className="mt-[23px] flex flex-col gap-y-2">
            <div className="h-[335px] w-[335px] rounded-[16px] bg-gray-100"></div>
            <div className="h-[335px] w-[335px] rounded-[16px] bg-gray-100"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
