import MemberHeader from '@/components/member/common/MemberHeader'
import Link from 'next/link'

export default function Page2() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'공지'} isBottomBorder={true} headerColor={'bg-white'} />
        <div className="h-[116px]" />
        <div className="mt-[12px] px-5 pb-[145px]">
          <section className="flex flex-col gap-y-[3px] pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">전시회 제출물 안내</p>
            <p className="body-sm-regular text-gray-400">11월 07일 19:00</p>
          </section>

          <div className="body-sm-regular mt-[20px] text-gray-800">
            <p className="body-md-semibold">제출 기한</p>
            <ul className="px-5">
              <li className="list-disc">X배너 및 포스터: 11/17(월) 23시 59분까지,</li>
              <li className="list-disc">전시부스 운영 계획서: 11/20(목) 23시 59분까지</li>
            </ul>
            <p className="body-md-semibold mt-3">제출 방법</p>
            <ul>
              <Link href={'https://forms.gle/As5zGhJf1dKd4WU49'} className="text-primary-500">
                구글폼
              </Link>
              <p>을 통해 X배너 및 포스터 파일을 제출해주시기 바랍니다. </p>
              <Link href={'https://www.notion.so/KUSITMS-32nd-224e9c0234da81fb921cd9c30b871cd3?pvs=21'}>
                KUSITMS 32nd 전체 노션
              </Link>
              <p>에서</p>
              <Link className="text-primary-500" href={'https://www.notion.so/27fe9c0234da801aa2a0e698c008dcba?pvs=21'}>
                팀별 스페이스
              </Link>
              <p>에 접속 후 전시부스 운영 계획서 페이지에 내용을 채워주시기 바랍니다.</p>
            </ul>

            <p className="body-md-semibold mt-3">유의 사항</p>
            <ul className="pl-2">
              <li>⚡️ 제출물들의 제출 기한 및 미준수 시의 패널티가 상이하니 반드시 확인해주시기 바랍니다.</li>
              <li>
                ⚡️ 전시부스 운영 계획서 지각 제출의 경우 10분 단위로 참여도 점수가 1점씩 감점되어 시상 평가에 반영될
                예정입니다.
              </li>
              <li>
                ⚡️ X배너 및 포스터 파일의 제출기한을 준수하지 못한 팀의 경우 추가 제출 기회가 없으며 운영진 측에서
                인쇄를 지원하지 않습니다.
              </li>
              <li>
                ⚡️ 디자인 파트에서는 작업 시에 **X배너(60cm x 180cm, 타공 예정)** 및 **포스터 파일(A1 사이즈)** 의
                크기를 반드시 확인해주시기 바랍니다. 안녕하세요, 교육기획팀 김민지입니다. 16주차 세션으로 예정되어 있는
                전시회를 준비하기 위해 각 팀별로 제출해주셔야 할 항목들에 대해 안내해드리고자 합니다! 제출물 중 X배너 및
                포스터는 운영진 측에서 인쇄 후 전달해 드릴 예정이어서 일정상 제출기한을 상이하게 둔 점 양해
                부탁드립니다. 원활한 전시회 준비 및 운영을 위해 제출방법을 확인 후 제출물들의 형식과 기한을 반드시
                준수하여 제출해주시기 바랍니다.
              </li>
            </ul>
            <p className="mt-3">
              <strong>X배너(60cm x 180cm, 타공 예정)</strong> 및<strong>포스터 파일(A1 사이즈)</strong>의 크기를 반드시
              확인해주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
