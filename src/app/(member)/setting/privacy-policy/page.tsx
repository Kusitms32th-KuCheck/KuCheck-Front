import MemberHeader from '@/components/member/common/MemberHeader'

export default function PrivacyPolicy() {
  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] min-h-screen bg-white">
        <MemberHeader headerType="dynamic" title={'개인정보 처리 방침'} headerColor={'bg-white'} />
        <div className="h-[116px]" />
        <div className="mt-[22px] flex flex-col gap-y-3 px-5">
          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">큐시즘 앱(큐첵) 개인정보처리방침</h2>
            <p className="body-md-regular">
              시행일자: 2025.10.30
              <br /> 한국대학생IT경영학회 KUSITMS(이하 “동아리”, “큐시즘”)는 「개인정보 보호법」 등 관련 법령과 큐시즘
              정관(특히 “회원과 관련된 모든 정보를 동의 없이 유출하지 않는다”는 원칙)을 준수하며, 회원의 개인정보를
              안전하게 보호하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다. <br />이 방침은 큐시즘이 운영하는
              모바일 애플리케이션 “큐시즘 앱(큐첵)” 및 이와 연동되는 관리자/운영 페이지에 공통 적용됩니다.
            </p>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제1조(처리하는 개인정보의 항목)</h2>
            <div className="body-md-regular">
              동아리는 아래의 개인정보를 처리할 수 있습니다
              <br />
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="body-md-semibold list-decimal"> 필수 수집 항목</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">
                    소셜로그인 식별값(카카오/애플에서 제공하는 고유 ID 또는 토큰)
                  </li>
                  <li className="body-md-regular mx-3 list-disc">이름</li>
                  <li className="body-md-regular mx-3 list-disc">학교, 학과(전공)</li>
                  <li className="body-md-regular mx-3 list-disc">휴대전화번호</li>
                  <li className="body-md-regular mx-3 list-disc">
                    계정 권한 정보(학회원 / 운영진 [경영총괄팀(이하 경총) / 교육기획팀 / 대외홍보팀 / 학부학])
                  </li>
                  <li className="body-md-regular mx-3 list-disc">
                    출석·상벌점 이력(세션명, 출결 상태, 부여 일시, 부여 사유)
                  </li>
                  <li className="body-md-regular mx-3 list-disc">가입 승인 여부 및 승인 일시</li>
                  <li className="body-md-regular mx-3 list-disc">프로필 이미지</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 선택 수집 항목</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">큐픽·큐포터즈·TF 활동 인증자료</li>
                </ul>

                <li className="body-md-semibold list-decimal">
                  {' '}
                  서비스 이용 과정에서 자동으로 생성·수집될 수 있는 정보
                </li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">앱 이용 일시 및 접속 로그</li>
                  <li className="body-md-regular mx-3 list-disc">공지/세션 알림 수신 여부, 공지 열람 여부</li>
                  <li className="body-md-regular mx-3 list-disc">기기 정보(기기식별자, OS 버전, 앱 버전 등)</li>
                  <li className="body-md-regular mx-3 list-disc">QR 출석 시점, 출석 대상 세션 식별 정보</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 증빙 제출 시 수집될 수 있는 정보</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">불참·지각 사유서에 포함된 세션명, 일시, 사유</li>
                  <li className="body-md-regular mx-3 list-disc">증빙 파일</li>
                </ul>
              </ul>
              ※ 동아리는 원칙적으로 민감정보(건강, 정치성향, 범죄경력 등)를 요구하지 않습니다. 다만 회원이 불참사유서에
              스스로 기재하여 제출하는 경우에는 해당 사유 확인 목적으로만 열람합니다.
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제2조(개인정보의 수집 방법)</h2>
            <div className="body-md-regular">
              동아리는 다음의 방법으로 개인정보를 수집합니다.
              <br />
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="body-md-regular list-decimal">
                  회원이 앱의 회원가입/로그인/프로필 화면에 직접 입력하는 경우
                </li>
                <li className="body-md-regular list-decimal">카카오·애플 소셜로그인 연동을 통해 제공되는 정보</li>
                <li className="body-md-regular list-decimal">세션 출석(QR) 이용 시 자동 수집</li>
                <li className="body-md-regular list-decimal">
                  큐픽·큐포터즈·TF 활동 인증자료, 불참사유서, 증빙 서류를 회원이 앱에 업로드하는 경우
                </li>
                <li className="body-md-regular list-decimal">
                  서비스 이용 과정에서 생성되는 로그, 접속기록, 알림수신 기록 등 자동수집장치에 의한 수집
                </li>
                <li className="body-md-regular list-decimal">
                  경총이 관리 목적(출석·상벌점 부여, TF 인원 등록)으로 관리자 화면에 직접 입력하는 경우
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제3조(개인정보의 처리 목적)</h2>
            <div className="body-md-regular">
              동아리는 아래의 목적을 위하여 개인정보를 처리하며, 목적이 변경되는 경우에는 앱 공지를 통해 사전
              안내합니다.
              <br />
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="body-md-semibold list-decimal"> 회원 식별 및 가입 승인</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">큐시즘 학회원 여부 확인</li>
                  <li className="body-md-regular mx-3 list-disc">중복 가입 및 중도 탈퇴 후 재가입 제한 여부 확인</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 출석 및 상벌점 관리</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">세션별 출결 확인</li>
                  <li className="body-md-regular mx-3 list-disc">
                    사유 있는 결석과 무단결석 구분(정관 제3장 제7조 기준)
                  </li>
                  <li className="body-md-regular mx-3 list-disc">지각·조퇴에 따른 벌점 부여</li>
                  <li className="body-md-regular mx-3 list-disc">
                    상점 부여(큐포터즈, TF, 활동수기, 명절·연휴 세션 참석 등) 및 누적 벌점 감면
                  </li>
                </ul>

                <li className="body-md-semibold list-decimal"> 활동·인증자료 관리</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">큐픽, 큐포터즈, TF 등 동아리 내 활동 증빙</li>
                  <li className="body-md-regular mx-3 list-disc">활동량에 따른 상점 부여, 기록 보존</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 세션·공지 제공 및 알림 발송</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">세션 일정, 장소, 세션 정보 안내</li>
                  <li className="body-md-regular mx-3 list-disc">공지 미열람자 알림, 벌점 부여 안내</li>
                  <li className="body-md-regular mx-3 list-disc">앱 주요 기능 변경 사전 안내</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 서비스 품질 개선 및 통계</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">부정 이용(대리 출석, 허위 인증) 모니터링</li>
                </ul>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제4조(개인정보의 보유 및 이용기간)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="body-md-semibold list-decimal"> 기본 원칙</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">개인정보는 처리 목적이 달성되면 파기합니다.</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 기수 활동 정보(출석·상벌점·증빙자료)</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">보관 기간: 해당 기수 활동 종료 후 최대 2년</li>
                  <li className="body-md-regular mx-3 list-disc">
                    보관 사유: 수료 여부 확인, 상벌점 이의 제기 처리, 차기 모집 시 재가입 제한 확인
                  </li>
                </ul>

                <li className="body-md-semibold list-decimal"> 분쟁·민원 처리 자료</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">보관 기간: 분쟁해결 시까지</li>
                </ul>

                <li className="body-md-semibold list-decimal"> 회원탈퇴 시</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">
                    앱 이용을 위해 저장된 프로필, 알림 기록 등은 삭제되나, 동아리 운영상 반드시 남겨야 하는 최소
                    정보(해당 기수 활동 여부, 상점 부여 사실, 징계·제한 이력, 블랙리스트 여부)는 별도 분리 보관할 수
                    있습니다.
                  </li>
                </ul>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제5조(개인정보의 제3자 제공)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal"> 동아리는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다</li>
                <li className="list-decimal"> 다만 다음의 경우에는 예외로 합니다.</li>

                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">회원이 사전에 명시적으로 동의한 경우</li>
                  <li className="body-md-regular mx-3 list-disc">
                    법령에 근거가 있거나 수사기관이 적법한 절차에 따라 요청한 경우
                  </li>
                  <li className="body-md-regular mx-3 list-disc">
                    동아리 운영을 위해 불가피하게 상위 기관(학교, 연합동아리 협력조직, 지도교수 등)에 최소한의 정보
                    제출이 필요한 경우
                  </li>
                  <li className="body-md-regular mx-3 list-disc">
                    전시회·공모전·대회 등 회원이 직접 신청한 외부 활동에 참가하기 위해 명단을 제출해야 하는 경우
                  </li>
                </ul>
                <li className="list-decimal">위 경우에도 동아리는 목적 달성을 위한 최소한의 항목만을 제공합니다.</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제6조(정보주체의 권리·의무 및 행사 방법)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  {' '}
                  회원은 언제든지 앱 내 설정에서 자신의 프로필 이미지를 조회·수정할 수 있습니다.
                </li>
                <li className="list-decimal">
                  {' '}
                  회원은 언제든지 현 기수 운영진에게 자신의 개인정보를 수정요청할 수 있습니다.
                </li>
                <li className="list-decimal">
                  {' '}
                  회원은 앱 내 회원탈퇴 기능 또는 운영진 연락을 통해 개인정보 삭제를 요청할 수 있습니다.
                </li>
                <li className="list-decimal">
                  {' '}
                  운영진/경총이 부여한 출석·상벌점 내역에 이의가 있는 경우, 이메일로 정정을 요청할 수 있습니다. 다만
                  동아리 회칙·정관에서 정한 출석/벌점 기준에 해당하는 경우에는 수정이 제한될 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제7조(개인정보의 파기 절차 및 방법)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">파기 절차</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">
                    보유기간이 경과하거나 처리 목적이 달성된 개인정보는 별도 DB로 옮겨지거나 즉시 파기합니다.
                  </li>
                  <li className="body-md-regular mx-3 list-disc">
                    별도 DB로 옮겨진 정보는 법령 또는 정관상 보존 목적 이외에는 사용하지 않습니다.
                  </li>
                </ul>

                <li className="list-decimal">파기 방법</li>
                <ul className="flex flex-col">
                  <li className="body-md-regular mx-3 list-disc">
                    전자적 파일: 복구·재생이 불가능한 기술적 방법으로 영구 삭제
                  </li>
                </ul>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제8조(개인정보의 안전성 확보 조치)</h2>
            <div className="body-md-regular">
              <p>동아리는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 실시합니다.</p>
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">인증수단 보호: 비밀번호, 토큰, 소셜로그인 정보는 안전한 방식으로 저장</li>
                <li className="list-decimal">수정기록 보관: 경총이 출석/벌점 정보를 열람·수정한 경우 그 내역을 기록</li>
                <li className="list-decimal">암호화 통신: 개인정보 전송 시 HTTPS 등 암호화 프로토콜 적용</li>
                <li className="list-decimal">백업 및 복구: 장애 발생에 대비한 주기적 백업</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제9조(카카오/애플 외부 로그인 서비스와의 관계)</h2>
            <div className="body-md-regular">
              <p>동아리는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 실시합니다.</p>
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  회원이 카카오, 애플 로그인을 사용하는 경우, 해당 플랫폼이 직접 수집하는 정보는 각 플랫폼의
                  개인정보처리방침이 적용되며, 동아리는 그 수집범위를 통제하지 않습니다.
                </li>
                <li className="list-decimal">
                  동아리는 외부로그인을 통해 제공되는 최소한의 정보(식별자, 이름, 이메일 등)만 회원 식별 및 서비스
                  가입/승인 목적으로 이용합니다.
                </li>
                <li className="list-decimal">
                  회원이 소셜계정을 삭제하거나 연결을 해제하는 경우, 앱 일부 기능 이용이 제한될 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제10조(개인정보 자동수집 장치의 설치·운영 및 거부)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  동아리는 공지 미열람 안내, 세션 리마인드, 앱 사용성 개선을 위해 단말기 식별값, 푸시 토큰 등을 자동으로
                  수집할 수 있습니다.
                </li>
                <li className="list-decimal">
                  회원은 단말기 설정에서 알림 수신을 거부할 수 있으나, 이 경우 일부 서비스(중요 공지, 출석 리마인드)
                  이용이 제한될 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제11조(개인정보 보호책임자)</h2>
            <div className="body-md-regular">
              <p>
                동아리는 개인정보 관련 업무를 총괄하여 책임지고, 개인정보 침해사고 및 민원 처리를 위하여 아래와 같이
                개인정보 보호책임자를 지정합니다.
              </p>

              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-disc">개인정보 보호책임자: 한인우</li>
                <li className="list-disc">직책: 큐첵 PM</li>
                <li className="list-disc">이메일: haninwoo0628@naver.com</li>
                <li className="list-disc">연락처: 010-7384-8420</li>
              </ul>
              <p>※ 직책이 변경되는 경우, 개인정보 보호책임자를 지정하고 앱 공지를 통해 알립니다.</p>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제12조(권익침해 구제방법)</h2>
            <div className="body-md-regular">
              <p>회원은 아래 기관을 통해 개인정보 침해에 대한 상담 및 피해구제를 요청할 수 있습니다.</p>

              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-disc">개인정보침해신고센터 (국번없이 118)</li>
                <li className="list-disc">개인정보분쟁조정위원회 (1833-6972)</li>
                <li className="list-disc">대검찰청 사이버수사과</li>
                <li className="list-disc">경찰청 사이버범죄수사단</li>
              </ul>
            </div>
          </section>

          <section className="border-b border-gray-100 pb-4 text-gray-700">
            <h2 className="body-2xl-semibold">제13조(개인정보처리방침의 변경)</h2>
            <div className="body-md-regular">
              <ul className="mt-5 flex flex-col gap-y-1 px-5 pb-2">
                <li className="list-decimal">
                  이 개인정보처리방침은 법령, 서비스, 정관 변경에 따라 수정될 수 있습니다.
                </li>
                <li className="list-decimal">
                  중요한 내용이 변경되는 경우, 서비스 내 공지사항 또는 팝업을 통해 최소 7일 전 사전 고지합니다.
                </li>
                <li className="list-decimal">변경된 방침은 앱에 게시된 날로부터 효력을 가집니다.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
