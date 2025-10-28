import { GuideSection } from '@/types/member/absence'

const ATTENDANCE_GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'completion-condition',
    title: '큐시즘 수료 가능 조건',
    description: '기수의 마지막 활동일 기준 상벌점 -5 이하일시 수료 가능',
  },
  {
    id: 'attendance-absence',
    title: '출석 / 결석',
    description: '부득이한 불참의 경우, 해당 세션 주의 목요일 23:59분까지 불참 사유서 제출',
  },
  {
    id: 'attendance-standard',
    title: '출석 인정 기준',
    description: '세션 시작시에 도착 시 출석 인정\nex) 12시 세션 시작 / 12시까지 도착 시 인정',
  },
  {
    id: 'tardiness-standard',
    title: '지각 / 조퇴 처리 기준',
    description:
      '지각: 세션 시작 후 20분 이내에 도착\n조퇴: 세션 종료 1시간 전 조퇴\n지각 / 조퇴 각각 벌점 -1점으로 처리\n',
  },
  {
    id: 'absence-standard',
    title: '결석 기준',
    description:
      '1. 당일 학교 시험 및 수업 \n증빙 서류 지참 시 벌점 1점 증빙 \n예시: 당일 학교 시험 및 수업 관련 공지\n\n2. 세션 시작 20분 이후 도착\n- 예외 없음 \n- 벌점 2점\n\n3. 사유서 미제출 \n- 예외 없음 \n- 벌점 3점',
  },
  {
    id: 'exception-rules',
    title: '예외 규정',
    description:
      '1. 기업 코딩 테스트 및 취업 활동\n - 증빙 서류 제출 시 인정 결석 처리 \n - 단순 자격증 취득을 위한 응시는 해당되지 않음\n\n증빙 예시 (택 1)\n - 코딩 테스트 날짜 및 시간이 나온 스크린샷\n - 코딩 테스트 완료 스크린샷 (이름을 제외한 개인정보는 가려주세요)\n - 면접 시간 포함된 이메일 스크린샷 (이름을 제외한 개인정보는 가려주세요)\n\n\n2. 질병\n - 증빙 서류 제출 시 인정 결석 처리\n - 증빙 예시: 진단서\n\n3. 4촌 이내의 경조사\n - 출석 인정\n - 지인 경조사는 해당 되지 않음\n\n4. 천재지변, 감염병 등 국가 위기 재난 상황으로 인한 행정 명령',
  },
  {
    id: 'reward-standard',
    title: '상점 기준 (수료일 전날 부여)',
    description:
      '1. 명절 및 연휴 기간 열리는 커리큘럼에 지각 하지 않고 참석한 경우\n - 상점 1점 부여\n\n2. 경영총괄팀이 선별한 외부행사에 참여하는 경우 (큐픽)\n - 상점 1점 부여\n - 인증 예시: 듣고 있는 화면 스크린샷\n\n3. 활동 수기를 작성한 경우 (큐포터즈)\n - 상점 1점 부여\n\n4. 운영진으로 맡은 직무를 끝까지 수행한 경우\n - 상점 1점 부여\n\n5. 해당 기수에 운영되는 스터디에 성실히 임한 경우\n - 상점 1점 부여\n - 스터디 팀장이 스터디 보고서를 모두 제출한 경우\n - 해당 스터디를 진행하는 팀원이 스터디 기간동안 모든 스터디 일정에 출석한 경우\n\n6. TF 팀의 PM / 팀장 / 팀원으로 참여하는 자 \n - 상점 2점 부여',
  },
]
export default function ReasonForAbsenceGuidePage() {
  return (
    <div className="px-5">
      {ATTENDANCE_GUIDE_SECTIONS.map((section) => (
        <section key={section.id} className="border-background2 flex flex-col gap-y-[12px] border-b py-[28px]">
          <h3 className="body-lg-semibold text-gray-700">{section.title}</h3>
          <p className="caption-md-regular whitespace-pre-line text-gray-600">{section.description}</p>
        </section>
      ))}
    </div>
  )
}
