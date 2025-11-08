import MemberHeader from '@/components/member/common/MemberHeader'
import Link from 'next/link'
import Image from 'next/image'

export default function Page1() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'공지'} isBottomBorder={true} headerColor={'bg-white'} />
        <div className="h-[116px]" />
        <div className="mt-[12px] px-5 pb-[145px]">
          <section className="flex flex-col gap-y-[3px] pt-[10px] pb-[8px]">
            <p className="heading-sm-semibold">이달의 큐픽</p>
            <p className="body-sm-regular text-gray-400">11월 07일 19:00</p>
          </section>

          <div className="body-sm-regular mt-[20px] text-gray-800">
            안녕하세요! 경영총괄팀 사무대관 담당 윤창현입니다
            <br /> 이번 32기의 두 번째 큐픽, 11월의 큐픽이 찾아왔습니다 🎤🌟
            <br />
            <br />
            <p className="body-md-semibold">큐픽이란?</p>
            <ul className="mt-1 pl-5">
              <li className="list-disc">
                한 달에 한 번씩 열리는 온라인 세미나 강의로, 수강하시면 상점 1점이 부여됩니다!
              </li>
              <li className="list-disc">큐픽으로 한 달에 얻을 수 있는 최대 상점은 1점입니다.</li>
            </ul>
            <br />
            <p className="body-md-semibold">이달의 큐픽 신청 방법</p>
            <ul className="mt-1 pl-5">
              <li className="list-disc">
                각 큐픽에 해당하는 사이트 링크를 통해 개별적으로 지원해주세요. (단체를 쓰라고 하는 항목이 나온다면
                ‘한국대학생IT경영학회‘를 쓰시면 됩니다.)
              </li>
              <li className="list-disc">개별 지원 후 신청 페이지를 캡처하여 @윤창현에게 보내주세요.</li>
              <li className="list-disc">당일에 시청하고 있는 화면을 캡쳐 혹은 사진으로 인증해주시면 됩니다.</li>
            </ul>
            <br />
            큐밀리 여러분의 많은 참여 부탁드립니다
          </div>

          <div className="my-5 flex flex-col gap-y-4">
            <div>
              <p className="body-sm-semibold">1. [퍼즐 인사이트]2025년 마케팅 성공 사례 노하우 최초 공개,</p>
              <Link
                href={
                  'https://event-us.kr/puzlcorporation/event/114578?utm_source=eventus&utm_medium=organic&utm_campaign=search-result'
                }
                className="text-primary-500 body-sm-regular"
              >
                [링크 바로가기]
              </Link>
              <ul className="body-sm-regular px-5">
                <li className="list-disc">일시 : 11월 13일(목)</li>
                <li className="list-disc">시간 : 16:00 ~ 18:00</li>
                <li className="list-disc">장소 : YouTube</li>
              </ul>
            </div>

            <div>
              <p className="body-sm-semibold">2. [KISA] WHOIS OpenAPI를 활용한 도메인/IP 정보 알아보기</p>
              <Link
                href={
                  'https://event-us.kr/Ut2KSHw11cCG/event/115543?utm_source=eventus&utm_medium=organic&utm_campaign=search-result'
                }
                className="text-primary-500 body-sm-regular"
              >
                [링크 바로가기]
              </Link>
              <ul className="body-sm-regular px-5">
                <li className="list-disc">일시 : 11월 21일(금)</li>
                <li className="list-disc">시간 : 10:00 ~ 11:30</li>
                <li className="list-disc">장소 : 이벤터스 웨비나</li>
              </ul>
            </div>

            <div>
              <p className="body-sm-semibold">
                3. AI 모델 성능 관리, 이제는 데이터 경영의 시대 - 실제 사례로 보는 AI 성능 개선 전략
              </p>
              <Link
                href={
                  'https://event-us.kr/pebblous/event/115141?utm_source=eventus&utm_medium=organic&utm_campaign=search-result'
                }
                className="text-primary-500 body-sm-regular"
              >
                [링크 바로가기]
              </Link>
              <ul className="body-sm-regular px-5">
                <li className="list-disc">일시 : 11월 18일(화)</li>
                <li className="list-disc">시간 : 15:00 ~ 16:00</li>
                <li className="list-disc">장소 : Zoom</li>
              </ul>
            </div>

            <div>
              <p className="body-sm-semibold">
                4. 어디에서도 말하지 않은 K-브랜드의 내실 : 포트원의 재무 자동화 솔루션 웨비나 개최
              </p>
              <Link
                href={
                  'https://event-us.kr/preimatnc/event/115347?utm_source=eventus&utm_medium=organic&utm_campaign=search-result'
                }
                className="text-primary-500 body-sm-regular"
              >
                [링크 바로가기]
              </Link>
              <ul className="body-sm-regular px-5">
                <li className="list-disc">일시 : 11월 28일(금)</li>
                <li className="list-disc">시간 : 15:00 ~ 16:00</li>
                <li className="list-disc">장소 : 기타</li>
              </ul>
            </div>
          </div>

          {/*<section className="flex flex-col gap-y-2 py-[23px]">*/}
          {/*  <div className="flex items-center gap-x-2 rounded-[4px] bg-gray-100 px-[10px] py-3">*/}
          {/*    <PaperclipIcon width={20} height={20} />*/}
          {/*    <p className="body-sm-regular">*/}
          {/*      공지사항 첨부파일.pdf <span className="text-gray-500">(10mb)</span>*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*  <div className="flex items-center gap-x-2 rounded-[4px] bg-gray-100 px-[10px] py-3">*/}
          {/*    <PaperclipIcon width={20} height={20} />*/}
          {/*    <p className="body-sm-regular">*/}
          {/*      공지사항 첨부파일.pdf <span className="text-gray-500">(10mb)</span>*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</section>*/}

          <section className="flex flex-col gap-y-2">
            <div className="relative h-[200px] w-full rounded-[16px] bg-gray-100">
              <Image src={'/ut/UT_01.png'} alt="이미지" fill className="rounded-[16px] object-cover" />
            </div>
            <div className="relative h-[200px] w-full rounded-[16px] bg-gray-100">
              <Image src={'/ut/UT_02.png'} alt="이미지" fill className="rounded-[16px] object-cover" />
            </div>
            <div className="relative h-[200px] w-full rounded-[16px] bg-gray-100">
              <Image src={'/ut/UT_03.jpg'} alt="이미지" fill className="rounded-[16px] object-cover" />
            </div>
            <div className="relative h-[200px] w-full rounded-[16px] bg-gray-100">
              <Image src={'/ut/UT_04.jpg'} alt="이미지" fill className="rounded-[16px] object-cover" />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
