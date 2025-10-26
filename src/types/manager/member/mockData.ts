export type Member = {
  name: string
  photo?: string
  part: string
  school: string
  major: string
  phone: string
  social: string
}

export const generateMockMembers = (): Member[] => {
  return new Array(12).fill(null).map((_, i) => ({
    name: [
      '임민서',
      '윤수빈',
      '강현규',
      '오단비',
      '김현아',
      '채지원',
      '이현진',
      '손하늘',
      '한인우',
      '김수린',
      '손아현',
      '김민지',
    ][i % 12],
    photo: '/png/mock-image-2.png',
    part: '기획',
    school: '아주대학교',
    major: 'AI빅데이터융합경영학과 / 소프트웨어전공',
    phone: '01012345678',
    social: 'applemail@daum.net',
  }))
}
