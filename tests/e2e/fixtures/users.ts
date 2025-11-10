// tests/e2e/fixtures/signup.ts
// ✅ 회원가입 폼에 입력할 데이터
import { expect } from '@playwright/test'

export const signupFormData = {
  // 정상 회원가입 데이터
  validSignup: {
    name: '황유림',
    school: '충북대학교',
    major: '의류학과/소프트웨어학과',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 다른 정상 회원 (중복 가입 테스트용)
  anotherValidSignup: {
    name: '김선화',
    school: '숙명여자대학교',
    major: 'IT공학전공',
    part: '프론트엔드',
    phoneNumber: '010-1234-5435',
  },

  // 세 번째 정상 회원
  thirdValidSignup: {
    name: '이유정',
    school: '중앙대학교',
    major: '경영학과',
    part: '기획',
    phoneNumber: '010-1234-5678',
  },

  // 빈 이름 (필수 필드)
  missingName: {
    name: '',
    school: '충북대학교',
    major: '의류학과',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 빈 학교 (필수 필드)
  missingSchool: {
    name: '황유림',
    school: '',
    major: '의류학과',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 빈 학과 (필수 필드)
  missingMajor: {
    name: '황유림',
    school: '충북대학교',
    major: '',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 빈 파트 (필수 필드)
  missingPart: {
    name: '황유림',
    school: '충북대학교',
    major: '의류학과',
    part: '',
    phoneNumber: '010-7557-9217',
  },

  // 잘못된 휴대폰 형식
  invalidPhoneFormat: {
    name: '황유림',
    school: '충북대학교',
    major: '의류학과',
    part: '프론트엔드',
    phoneNumber: '12345', // 형식 오류
  },

  // 너무 긴 이름
  tooLongName: {
    name: '황유림이름이매우매우매우길어요이러면안됩니다정말길어요',
    school: '충북대학교',
    major: '의류학과',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 특수문자 포함 (이름)
  nameWithSpecialChar: {
    name: '황유림@#$%',
    school: '충북대학교',
    major: '의류학과',
    part: '프론트엔드',
    phoneNumber: '010-7557-9217',
  },

  // 모든 필드가 비어있음
  emptyForm: {
    name: '',
    school: '',
    major: '',
    part: '',
    phoneNumber: '',
  },
}

// 회원가입 후 예상되는 응답 데이터
export const signupExpectedResponses = {
  // 정상 응답
  success: {
    success: true,
    message: '회원가입이 완료되었습니다',
    data: {
      memberId: expect.any(Number),
      name: expect.any(String),
      status: 'PENDING', // 새 가입자는 항상 PENDING
      role: 'GUEST', // 새 가입자는 항상 GUEST
      hasInfo: true,
    },
  },

  // 필수 필드 누락
  missingField: {
    success: false,
    message: expect.stringContaining('필수'),
  },

  // 잘못된 형식
  invalidFormat: {
    success: false,
    message: expect.stringContaining('형식'),
  },

  // 중복 가입
  duplicateSignup: {
    success: false,
    message: expect.stringContaining('이미 등록'),
  },
}
