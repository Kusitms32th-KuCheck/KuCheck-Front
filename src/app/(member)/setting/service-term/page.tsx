import MemberHeader from '@/components/member/common/MemberHeader'

export default function PrivacyPolicy() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'서비스 이용 약관'} headerColor={'bg-white'} />
        {/*<div className="h-[116px]" />*/}
        <div className="h-[60px]" />
        <div className="mt-[22px] px-5">
          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">큐시즘 앱(큐첵) 서비스 이용약관</h2>
            <p className="body-md-regular">
              시행일자: 2025.10.30
              <br /> 본 약관은 큐시즘 동아리(이하 “동아리”)가 활동 관리를 위해 사용하는 모바일 애플리케이션 “큐첵”을
              큐피드 팀(이하 “운영팀”)이 개발·운영함에 따라, 서비스를 실제로 사용하는 큐시즘 소속 학회원 및
              운영진·경영총괄(이하 통칭 “회원”)과 운영팀, 그리고 활동 기준을 정하는 동아리 사이의 권리·의무 및 이용
              절차를 규정하는 것을 목적으로 한다.
            </p>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold"> 제1조(목적)</h2>
            <p className="body-md-regular">
              이 약관은 운영팀이 제공하는 “큐첵” 서비스를 회원이 이용함에 있어, 서비스 이용조건과 절차, 운영팀과 회원의
              권리·의무, 그리고 동아리가 정한 출석·상벌점 규정을 앱에 반영하는 방식 등 기타 필요한 사항을 정함을
              목적으로 한다.
            </p>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제2조(약관의 효력 및 변경)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  본 약관은 서비스 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력이 발생한다.
                </li>
                <li className="list-decimal">
                  약관의 변경 권한은 운영팀에 있으며, 운영팀은 동아리의 운영방침 변경 요청을 반영하여 약관을 수정할 수
                  있다.
                </li>
                <li className="list-decimal">
                  변경 내용은 서비스 내 공지사항에 게시하며, 필요한 경우 동아리에도 통지할 수 있다.
                </li>
                <li className="list-decimal">
                  회원은 변경된 약관에 동의하지 않을 경우 탈퇴(이용계약 해지)를 할 수 있으며, 변경 이후에도 서비스를
                  계속 이용하는 경우 변경된 약관에 동의한 것으로 본다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제3조(이용계약의 성립)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원이 카카오 또는 애플 소셜로그인으로 로그인하고 본 약관에 동의한 때에 이용계약이 성립한다.
                </li>
                <li className="list-decimal">
                  서비스는 큐시즘 소속자를 전제로 하므로, 학회원 여부를 확인하는 가입 승인 절차를 둔다. 이 승인 자체는
                  원칙적으로 동아리/경총의 권한이고, 운영팀은 승인 기능을 기술적으로 제공하는 역할을 한다.
                </li>
                <li className="list-decimal">
                  허위정보 기재, 타인의 명의 도용, 큐시즘 비소속자, 가입 목적이 불분명한 경우 동아리는 승인을 보류하거나
                  거부할 수 있다.
                </li>
                <li className="list-decimal">
                  운영팀은 서비스 안전을 위해 특정 계정의 이용을 제한할 수 있으나, 회원 자격 자체의 박탈 여부는 동아리
                  규정을 따른다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제4조(계정 및 로그인)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  서비스는 카카오 또는 애플 계정을 통한 소셜로그인만을 지원하며, 지원 범위는 운영팀의 정책 및 해당
                  플랫폼의 제공 범위에 따라 달라질 수 있다.
                </li>
                <li className="list-decimal">
                  회원은 자신의 계정 정보를 선량한 관리자의 주의 의무로 관리해야 하며, 제3자에게 대여·양도할 수 없다.
                </li>
                <li className="list-decimal">
                  계정 도용, 분실, 무단 로그인 등이 발생한 경우 회원은 즉시 운영팀 또는 동아리에 알려야 하고, 운영팀은
                  필요 시 계정 이용을 일시 제한할 수 있다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제5조(권한 및 역할)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">서비스는 다음과 같은 기본 권한 체계를 둘 수 있다.</li>
                <ul className="pl-3">
                  <li className="list-disc">
                    학회원: 상벌점 조회, 세션 정보 열람, 공지 확인, 불참사유서 제출, 큐픽 인증자료 제출, 알림 수신, 세션
                    출석체크
                  </li>
                  <li className="list-disc">
                    운영진(경총/학부학): 상벌점 조정, 회원가입 승인/거부, 공지 미조회자 조회 및 일괄 알림
                  </li>
                  <li className="list-disc">
                    운영팀(큐피드): 장애 복구, 데이터 정합성 점검, 계정 잠금 해제 등 기술적 최고 권한만을 가지며,
                    점수·출석의 실제 내용 결정에는 관여하지 않는다.
                  </li>
                </ul>
                <li className="list-decimal">
                  권한의 구체적인 범위와 메뉴 노출은 동아리의 요청과 운영팀의 기술적 정책에 따라 변경될 수 있다.
                </li>
                <li className="list-decimal">회원은 부여받지 않은 권한을 임의로 사용하거나 우회해서는 안 된다.</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제6조(정보주체의 권리·의무 및 행사 방법)</h2>
            <div className="body-md-regular">
              <p>서비스는 동아리의 활동을 전산화하기 위해 다음 각 호의 기능을 포함할 수 있다.</p>
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">출석 및 상벌점 관리</li>
                <ul className="pl-3">
                  <li className="list-disc">세션별 출석체크</li>
                  <li className="list-disc">세션별·활동유형별 상점 벌점 내역 보기</li>
                  <li className="list-disc">지각/조퇴/결석(사유서 제출/미제출) 코드에 따른 자동 점수화</li>
                  <li className="list-disc">특정 시점 일괄 처리 내역 제공</li>
                  <li className="list-disc">단, 점수 기준은 동아리가 정하고 운영팀은 이를 시스템에 반영 한다.</li>
                </ul>

                <li className="list-decimal">불참사유서 신청</li>
                <ul className="pl-3">
                  <li className="list-disc">
                    세션 일시, 불참유형(불참/지각/조퇴), 지각·조퇴 시간, 사유, 증빙서류 업로드
                  </li>
                  <li className="list-disc">운영진의 승인 여부 표시</li>
                </ul>

                <li className="list-decimal">큐픽/큐포터즈 활동 증빙</li>
                <ul className="pl-3">
                  <li className="list-disc">인증샷 업로드</li>
                  <li className="list-disc">승인 시 상점 자동 또는 수동 부여(부여 기준은 동아리 규정)</li>
                </ul>

                <li className="list-decimal">세션 정보 확인</li>
                <ul className="pl-3">
                  <li className="list-disc">세션명, 날짜·시간, 장소, 설명, 이미지 열람</li>
                  <li className="list-disc">전체 세션 일정 달력/리스트 보기</li>
                </ul>

                <li className="list-decimal">공지사항/세션 공지</li>
                <ul className="pl-3">
                  <li className="list-disc">카테고리 구분, 마크다운 형식 지원</li>
                  <li className="list-disc">공지 미조회자 확인 및 일괄 푸시알림</li>
                  <li className="list-disc">예약 게시 기능</li>
                </ul>

                <li className="list-decimal">알림</li>
                <ul className="pl-3">
                  <li className="list-disc">회원 승인/ 공지 업로드/수정, 출결·상벌점 변동, 세션 전 리마인드</li>
                </ul>

                <li className="list-decimal">광고/배너</li>
                <ul className="pl-3">
                  <li className="list-disc">동아리 내 행사·프로젝트 홍보용 배너 노출</li>
                  <li className="list-disc">학회원 광고형 배너 노출</li>
                  <li className="list-disc">노출 여부·위치는 운영팀 정책과 동아리 요청을 함께 고려해 결정</li>
                </ul>

                <li className="list-decimal">회원정보/권한 관리</li>
                <ul className="pl-3">
                  <li className="list-disc">이름, 학교, 학과, 파트, 연락처 등 회원 기본정보 조회</li>
                  <li className="list-disc">권한(학회원/운영진/경총) 부여 및 회수</li>
                </ul>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제7조(상벌점 부여 기준)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  앱에 표시되는 상벌점은 동아리가 정한 규정에 따라 부여·차감되며, 운영팀은 이를 기록·표시하는 도구일 뿐
                  점수의 의미나 효력을 스스로 정하지 않는다.
                </li>
                <li className="list-decimal">
                  상벌점의 최종 효력과 해석은 동아리에 귀속되며, 앱 화면의 수치와 동아리 내부 최종 집계가 일시적으로
                  다를 수 있다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제8조(QR 출석)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  서비스는 기기 카메라를 이용해 세션 출석을 확인할 수 있도록 운영팀이 기능을 제공한다.
                </li>
                <li className="list-decimal">회원은 타인의 QR을 캡처·공유하여 대리출석을 하거나 조작해서는 안 된다.</li>
                <li className="list-decimal">
                  위반이 적발될 경우 제재의 수준과 방식은 동아리 규정을 따르며, 운영팀은 동아리의 요청에 따라 해당
                  출석을 무효 처리할 수 있다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제9조(게시물의 관리)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원이 서비스에 업로드한 사진, 글, 인증샷, 불참사유서의 책임은 게시자 본인에게 있다.
                </li>
                <li className="list-decimal">
                  운영팀은 다음 각 호에 해당하는 경우 동아리의 요청 또는 명백한 위반 정황이 있는 경우에 한해 사전 통지
                  없이 게시물을 숨김·삭제할 수 있다.
                </li>
                <ul className="pl-3">
                  <li className="list-disc">타인의 개인정보가 무단 포함된 경우</li>
                  <li className="list-disc">허위 사실, 비방, 모욕, 저작권 침해가 의심되는 경우</li>
                  <li className="list-disc">동아리 목적과 명백히 무관한 광고/홍보성 내용인 경우</li>
                  <li className="list-disc">서비스 운영을 심각하게 방해하는 경우</li>
                </ul>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제10조(저작권 등)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  서비스 화면, 디자인, 프로그램, 기본 배너, 공지 등의 저작권 및 지식재산권은 운영팀(큐피드) 또는 정당한
                  권리자에게 있다.
                </li>
                <li className="list-decimal">
                  회원이 서비스에 업로드한 콘텐츠에 대해서는 운영팀과 동아리가 서비스 운영, 기록 보존, 활동 홍보를 위해
                  무상으로 사용할 수 있는 이용권을 갖는다.
                </li>
                <li className="list-decimal">
                  회원은 운영팀 또는 동아리의 사전 허락 없이 앱 내 자료를 무단 복제, 배포, 2차 가공하여서는 안 된다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제11조(개인정보 보호)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  운영팀은 회원가입 승인, 출석 및 상벌점 관리, 공지 발송, 세션 안내, 권한 부여 등 동아리가 실제로 학회를
                  운영하는 데 필요한 최소한의 개인정보를 수집·이용한다.
                </li>
                <li className="list-decimal">
                  운영팀이 수집한 개인정보는 동아리(큐시즘)에게 제공·열람될 수 있으며, 이는 학회 운영·출석 확인·상벌점
                  부여·활동 증빙 확인 목적에 한정된다.
                </li>
                <li className="list-decimal">
                  개인정보의 수집·이용, 보관, 파기는 별도의 개인정보처리방침에서 정하며, 회원은 이를 열람할 수 있다.
                </li>
                <li className="list-decimal">
                  운영팀과 동아리는 회원의 동의 없이 목적 외로 개인정보를 이용하거나 제3자에게 제공하지 않는다. 다만
                  법령에 근거한 경우는 예외로 한다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제12조(알림)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  서비스는 공지 미조회자, 출결 변동, 세션 전 리마인드 등 운영상 필요한 알림을 앱 푸시로 보낼 수 있다.
                </li>
                <li className="list-decimal">
                  알림의 종류·시점은 동아리의 요청과 운영팀의 기술적 정책에 따라 달라질 수 있다.
                </li>
                <li className="list-decimal">
                  회원이 알림을 차단하는 경우 일부 공지나 출결 변동을 제때 확인하지 못할 수 있으며, 이로 인한 불이익은
                  회원에게 귀속된다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제13조(서비스의 변경 및 중단)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  운영팀은 운영상·기술상의 필요에 따라 서비스의 전부 또는 일부를 수정·변경할 수 있다.
                </li>
                <li className="list-decimal">
                  서버 점검, 보안 점검, 스토어 정책 변경, 기타 불가피한 사유가 있는 경우 서비스 제공을 일시 중단할 수
                  있으며, 가능한 경우 사전에 공지한다.
                </li>
                <li className="list-decimal">
                  운영팀이 무상으로 제공하는 서비스의 중단·변경에 대해서는 별도의 보상을 하지 않는다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제14조(회원 탈퇴)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원은 앱 내 “회원탈퇴” 메뉴를 통해 언제든지 이용계약을 해지할 수 있다.
                </li>
                <li className="list-decimal">
                  탈퇴 시 개인의 출석 기록, 상벌점 이력, 제출된 불참사유서, 큐픽/큐포터즈 인증자료 등 서비스 내 활동
                  이력은 복구가 불가능할 수 있다.
                </li>
                <ul className="pl-3">
                  <li className="list-disc">
                    다만 동아리가 학기·기수 정산, 상벌점 이의신청 처리 등을 위해 보관해야 하는 최소 기록은 동아리 측에
                    별도로 남을 수 있다. 이 보관은 동아리 규정과 개인정보처리방침을 따른다.
                  </li>
                </ul>
                <li className="list-decimal">탈퇴 후에는 동일 계정으로 과거 이력을 그대로 이어서 조회할 수 없다.</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제15조(운영진의 의무)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">운영진은 회원의 출석 및 상벌점 정보를 임의로 조작하지 않아야 한다.</li>
                <li className="list-decimal">
                  운영진은 자신에게 부여된 권한 범위 내에서만 정보를 열람·처리해야 하며, 개인적 목적으로 저장·배포해서는
                  안 된다.
                </li>
                <li className="list-decimal">
                  권한 오남용이 확인될 경우 동아리는 해당 계정의 권한을 회수하거나 서비스 이용을 제한하도록 운영팀에
                  요청할 수 있고, 운영팀은 이를 기술적으로 조치한다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제16조(회원의 의무)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원은 본 약관 및 서비스 내 안내사항, 그리고 동아리의 활동 규정을 준수해야 한다.
                </li>
                <li className="list-decimal">회원은 다음 각 호의 행위를 해서는 안 된다.</li>
                <ul className="pl-3">
                  <li className="list-disc">타인의 계정 도용, QR 대리 출석</li>
                  <li className="list-disc">허위 정보 등록, 증빙자료 위·변조</li>
                  <li className="list-disc">서비스의 정상적 운영을 방해하는 행위</li>
                  <li className="list-disc">동아리 또는 운영팀의 명예를 훼손하는 행위</li>
                </ul>
                <li className="list-decimal">
                  위 금지행위를 한 경우 동아리는 경고, 기능 제한, 점수 회수, 탈퇴 조치 등 동아리 규정에 따른 제재를 할
                  수 있으며, 운영팀은 동아리의 요청에 따라 해당 계정의 서비스 이용을 제한할 수 있다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제17조(면책)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  운영팀은 천재지변, 시스템 장애, 통신사 사정 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 그에
                  대한 책임을 지지 않는다.
                </li>
                <li className="list-decimal">
                  서비스에 표시되는 출석/상벌점이 실제 동아리 최종 집계와 일시적으로 다를 수 있으며, 최종 효력은 동아리
                  내부 규정과 경총의 최종 확인값에 따른다. 운영팀은 이 불일치에 대해 손해배상 책임을 지지 않는다.
                </li>
                <li className="list-decimal">
                  운영팀은 회원 간 또는 회원과 제3자 간에 발생한 분쟁에 직접 개입하지 않을 수 있으며, 이로 인한 손해에
                  대해 책임을 지지 않을 수 있다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제18조(손해배상)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원이 본 약관을 위반하여 운영팀 또는 동아리에 손해를 입힌 경우 회원은 그 손해를 배상해야 한다.
                </li>
                <li className="list-decimal">
                  운영팀이 회원에게 서비스를 무상으로 제공하는 한, 서비스 자체의 단순 오류·지연으로 인한 손해에 대해
                  별도의 손해배상은 하지 않는다.
                </li>
                <li className="list-decimal">
                  다만 동아리가 운영팀과 별도 계약을 통해 유상 기능을 이용하는 경우에는 그 계약에서 정한 바를 따른다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 py-4 text-gray-700">
            <h2 className="body-2xl-semibold">제19조(준거법 및 관할)</h2>
            <div className="body-md-regular">
              <ul className="flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">본 약관은 대한민국 법령을 따른다.</li>
                <li className="list-decimal">
                  서비스 이용과 관련하여 운영팀(큐피드 팀)과 회원 사이에 분쟁이 발생한 경우 운영팀의 소재지를 관할하는
                  법원을 제1심 관할법원으로 한다.
                </li>
                <li className="list-decimal">
                  동아리의 활동규정 해석과 관련된 이의제기는 우선 동아리내부 절차를 따르며, 서비스 화면과 동아리 내부
                  규정이 충돌할 경우 동아리 규정이 우선한다.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
