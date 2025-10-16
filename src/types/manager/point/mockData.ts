import { PointMemberStatus } from './types'
import { allDates } from './constants'

// 월별 점수를 계산하는 함수
export const calculateMonthlyScores = (sessions: Record<string, string>) => {
  const monthlyScores = {
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  }

  Object.entries(sessions).forEach(([date, value]) => {
    let score = 0
    if (value.includes('(-1)')) score = -1
    else if (value.includes('(-3)')) score = -3
    else score = 0

    if (date.startsWith('8/')) monthlyScores.august += score
    else if (date.startsWith('9/')) monthlyScores.september += score
    else if (date.startsWith('10/')) monthlyScores.october += score
    else if (date.startsWith('11/')) monthlyScores.november += score
    else if (date.startsWith('12/')) monthlyScores.december += score
  })

  return monthlyScores
}

// 새로운 더미 데이터 생성 함수
export const generateMockData = (): PointMemberStatus[] => {
  const names = ['강민서', '김민지', '김민서', '김민지', '박서연', '이주희', '최유진', '한소영', '정다은', '윤서연']
  const parts = ['기획', '디자인', '프론트엔드', '백엔드']
  const schools = ['서울대학교', '연세대학교', '고려대학교', '한양대학교', '중앙대학교']
  const majors = ['컴퓨터공학과', '경영학과', '디자인학과', '심리학과', '경제학과']

  return names.map((name, index) => {
    const sessions: Record<string, string> = {}

    allDates.forEach((date) => {
      const rand = Math.random()
      if (rand > 0.85) sessions[date] = '출석(0)'
      else if (rand > 0.8) sessions[date] = '결석(인정)'
      else if (rand > 0.75) sessions[date] = '결석(사유 -1)'
      else if (rand > 0.65) sessions[date] = '결석(무단 -2)'
      else if (rand > 0.7) sessions[date] = '결석(미제출 -3)'
      else if (rand > 0.95) sessions[date] = '지각(-1)'
      else sessions[date] = '조퇴(-1)'
    })

    const monthlyScores = calculateMonthlyScores(sessions)

    return {
      name,
      point: `${index - 5}`, // -5부터 4까지 점수 분포
      part: parts[index % parts.length],
      sessions,
      score: monthlyScores,
      qpick_september: Math.random() > 0.3 ? '참여' : '-',
      qpick_october: Math.random() > 0.3 ? '참여' : '-',
      qpick_november: Math.random() > 0.3 ? '참여' : '-',
      tf: Math.random() > 0.5 ? '2' : '-',
      study: Math.random() > 0.6 ? '1' : '-',
      qporters: Math.random() > 0.7 ? '1' : '-',
      is_manager: index < 3,
      phone: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      school: schools[index % schools.length],
      major: majors[index % majors.length],
    }
  })
}
