import { PointMemberStatus } from './types'

const allDates: string[] = ['8/1', '8/8', '9/5', '9/12', '10/3', '10/10', '11/7', '11/14', '12/5', '12/12']

// 월별 점수를 계산하는 함수
const calculateMonthlyScores = (sessions: Record<string, string>): PointMemberStatus['attendanceMonthlyTotals'] => {
  const monthlyScores: PointMemberStatus['attendanceMonthlyTotals'] = {
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  }

  Object.entries(sessions).forEach(([date, value]) => {
    let score = 0
    if (value.includes('(-3)')) score = -3
    else if (value.includes('(-1)')) score = -1
    else if (value.includes('(-2)')) score = -2
    else score = 0

    let monthKey: keyof PointMemberStatus['attendanceMonthlyTotals'] | null = null

    if (date.startsWith('8/')) monthKey = 8
    else if (date.startsWith('9/')) monthKey = 9
    else if (date.startsWith('10/')) monthKey = 10
    else if (date.startsWith('11/')) monthKey = 11
    else if (date.startsWith('12/')) monthKey = 12

    if (monthKey !== null) {
      monthlyScores[monthKey] += score
    }
  })

  return monthlyScores
}

// 새로운 더미 데이터 생성 함수
export const generateMockData = (): PointMemberStatus[] => {
  const names = ['진채정', '김민지', '한인우', '황유림', '이현진', '박소정', '강주언', '김영록']
  const parts = ['기획', '디자인', '프론트엔드', '백엔드']
  const schools = ['서울대학교', '연세대학교', '고려대학교', '한양대학교', '중앙대학교']
  const majors = ['컴퓨터공학과', '경영학과', '디자인학과', '심리학과', '경제학과']

  return names.map((name, index) => {
    const sessions: Record<string, string> = {}
    allDates.forEach((date) => {
      const rand = Math.random()
      if (rand > 0.85) sessions[date] = '출석(0)'
      else if (rand > 0.8) sessions[date] = '결석(인정)'
      else if (rand > 0.75) sessions[date] = '지각(-1)'
      else if (rand > 0.65) sessions[date] = '결석(사유 -1)'
      else if (rand > 0.55) sessions[date] = '조퇴(-1)'
      else if (rand > 0.45) sessions[date] = '결석(무단 -2)'
      else sessions[date] = '결석(미제출 -3)'
    })

    const attendanceMonthlyTotals = calculateMonthlyScores(sessions)

    const kupickParticipation: PointMemberStatus['kupickParticipation'] = {
      8: Math.random() > 0.3,
      9: Math.random() > 0.3,
      10: Math.random() > 0.3,
      11: Math.random() > 0.3,
      12: Math.random() > 0.3,
    }

    return {
      memberId: index + 1,
      name,
      part: parts[index % parts.length],

      // 개인정보
      phoneNumber: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      school: schools[index % schools.length],
      major: majors[index % majors.length],

      // 활동 정보
      isTf: Math.random() > 0.5,
      isStaff: index < 3,

      // 월별 총점
      attendanceMonthlyTotals,

      // 큐픽제출
      kupickParticipation,

      // 스터디/큐포터즈 점수
      studyPoints: Math.random() > 0.6 ? 1 : 0,
      kuportersPoints: Math.random() > 0.7 ? 1 : 0,

      // 비고
      memo: '',
    }
  })
}
