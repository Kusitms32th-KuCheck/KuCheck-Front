## 🤝 팀원 소개
<table>
  <tr>
    <th align="center" colspan="2">Frontend (FE)</th>
  </tr>
  <tr>
    <!-- FE avatars -->
    <td align="center">
      <img src="https://github.com/rusia9217.png" width="140" alt="황유림 GitHub Avatar" /><br/>
      <a href="https://github.com/rusia9217"><b>황유림</b></a><br/>
      <sub>Frontend Lead</sub>
    </td>
    <td align="center">
      <img src="https://github.com/ahcgnoej.png" width="140" alt="진채정 GitHub Avatar" /><br/>
      <a href="https://github.com/ahcgnoej"><b>진채정</b></a><br/>
      <sub>Frontend</sub>
    </td>
  </tr>
</table>

<br />

## 🛠 기술 스택

| 기술 / 도구 | 선택이유 |
|------|-------------|
| Next.js | Next.js를 도입한 핵심 목표는 사용자 성능 향상입니다. SSR/SSG를 통한 빠른 초기 로딩 속도 확보, 자동 이미지 최적화, 유연한 레이아웃 시스템 등 Next.js가 제공하는 강력한 최적화 이점들을 적극 활용하여 사용자 경험(UX)을 극대화하고자 했습니다. |
| TypeScript | TypeScript를 도입한 가장 큰 이유는 정적 타입 검사를 통해 런타임 에러를 개발 단계에서 미리 차단하여 서비스의 안정성을 극대화하기 위해서입니다. 또한, 명확한 타입 추론과 강력한 자동 완성 기능은 코드의 가독성과 개발 생산성을 높여주었으며, 유지보수성을 확보하는 데 결정적인 역할을 했습니다.|
| pnpm | pnpm을 도입한 가장 큰 이유는 압도적인 디스크 공간 효율성과 빠른 설치 속도 때문입니다. npm/yarn과 달리 node_modules에 패키지를 복제하지 않고 전역 스토어에서 하드 링크(Hard Link) 방식으로 파일을 가져와, 디스크 사용량을 획기적으로 줄이고 중복 설치를 방지합니다. 또한, package.json에 명시된 의존성에만 접근할 수 있는 엄격한 node_modules 구조를 구현하여, '유령 의존성(Phantom Dependencies)' 문제를 원천적으로 차단하고 프로젝트의 안정성을 높여줍니다.|
| TailwindCSS | TailwindCSS는 '유틸리티 퍼스트(Utility-First)' 접근 방식은 미리 정의된 클래스를 JSX/HTML 내에서 직접 조합하게 하여, CSS 파일과 코드를 오가는 컨텍스트 스위칭 비용을 완전히 제거했습니다. 직관적인 반응형 디자인과 상태 관리를 통해 개발 생산성을 높일 수 있었습니다.|
| Zustand | Zustand는 매우 간결한 문법과 최소한의 설정으로 상태 관리를 가능하게 해 개발 생산성을 극대화합니다. 또한, Provider로 감쌀 필요가 없고 상태의 필요한 부분만 구독하여 불필요한 리렌더링을 자동으로 방지하기 때문에 성능 최적화에 유리하여 선택하게 되었습니다.|
| E2E | E2E 테스트를 도입한 이유는 '실제 사용자' 관점에서 핵심 기능(회원가입, 큐픽, 불참사유서 작성)의 전체 흐름을 시뮬레이션하여, 애플리케이션의 무결성을 보장하기 위해서입니다. 이는 유닛/통합 테스트가 발견하기 어려운 프론트엔드, 백엔드 API, DB를 아우르는 복합적인 상호작용에서 발생하는 버그를 잡아내며, 배포 전 가장 높은 수준의 서비스 안정성을 확보하게 해줍니다.|
<br />

## 🗂️ 폴더 구조
```
KuCheck-Front/
├── src/
│   ├── app/                         # Next.js App Router - 페이지 및 레이아웃
│   │   ├── layout.tsx               # 루트 레이아웃
│   │   ├── page.tsx                 # 홈페이지
│   │   ├── (auth)/                  # 인증 관련 라우트 그룹
│   │   ├── (manager)/               # 매니저 기능 라우트 그룹
│   │   └── (member)/                # 멤버 기능 라우트 그룹
│   │
│   ├── components/                  # 재사용 가능한 React 컴포넌트
│   │   ├── common/                  # 공통 컴포넌트 (Header, Footer, Sidebar 등)
│   │   ├── ui/                      # UI 원자 컴포넌트 (Button, Input, Modal 등)
│   │   ├── manager/                 # 매니저 전용 컴포넌트
│   │   │   ├── QRCodeScanner/
│   │   │   ├── AttendanceList/
│   │   │   └── ...
│   │   └── member/                  # 멤버 전용 컴포넌트
│   │       ├── CheckIn/
│   │       ├── AbsenceForm/
│   │       └── ...
│   │
│   ├── hooks/                       # 커스텀 React Hooks
│   │   ├── useAuth.ts               # 인증 관련 훅
│   │   ├── useAttendance.ts         # 출석 관련 훅
│   │   ├── useFetch.ts              # API 요청 관리 훅
│   │   └── ...
│   │
│   ├── lib/                         # 유틸리티 및 라이브러리 설정
│   │   ├── api/                     # API 클라이언트
│   │   │   ├── axiosInstance.ts     # Axios 설정
│   │   │   └── endpoints.ts         # API 엔드포인트 정의
│   │   ├── utils/                   # 공통 유틸리티 함수들
│   │   │   ├── imageOptimizer.ts    # 이미지 최적화
│   │   │   ├── dateFormatter.ts     # 날짜 포맷팅
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── store/                       # Zustand 상태 관리
│   │   ├── authStore.ts             # 인증 상태
│   │   ├── attendanceStore.ts       # 출석 상태
│   │   └── ...
│   │
│   ├── types/                       # TypeScript 타입 정의
│   │   ├── attendance.ts            # 출석 관련 타입
│   │   ├── user.ts                  # 사용자 관련 타입
│   │   ├── api.ts                   # API 응답 타입
│   │   └── ...
│   │
│   ├── constants/                   # 상수 정의
│   │   ├── routes.ts                # 라우트 경로
│   │   ├── messages.ts              # 에러/성공 메시지
│   │   └── ...
│   │
│   ├── assets/                      # 정적 리소스
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── utils/                       # 전역 유틸리티 함수
│   │   ├── validators.ts            # 입력 검증 함수
│   │   ├── errorHandler.ts          # 에러 처리
│   │   └── ...
│   │
│   └── middleware.ts                # Next.js 미들웨어 (인증 체크 등)
│
├── tests/                           # E2E 테스트 (Playwright)
│   ├── signup.spec.ts               # 회원가입 플로우 테스트
│   ├── attendance.spec.ts           # 출석 기능 테스트
│   └── ...
│
├── public/                          # 정적 파일 (이미지, 폰트 등)
│
├── package.json                     # 프로젝트 메타데이터 및 의존성
├── tsconfig.json                    # TypeScript 설정
├── next.config.ts                   # Next.js 설정
├── tailwind.config.ts               # Tailwind CSS 설정
├── eslint.config.mjs                # ESLint 설정
└── .prettierrc                      # Prettier 설정
```

---

## 📁 폴더별 상세 설명

### **src/app**
Next.js의 App Router 기반 라우팅 시스템입니다. 폴더 구조가 곧 URL 경로가 되어 직관적인 페이지 관리가 가능합니다. 라우트 그룹(`(auth)`, `(manager)`, `(member)`)을 사용하여 공통 레이아웃을 공유하면서도 URL 경로에 포함되지 않게 관리합니다.

### **src/components**
재사용 가능한 React 컴포넌트를 기능과 역할에 따라 분류했습니다.
- **common**: 모든 페이지에서 공통으로 사용되는 Header, Footer, Navigation 등
- **ui**: shadcn/ui 기본 UI 요소들
- **manager/member**: 각 사용자 역할별 전용 컴포넌트

### **src/hooks**
React의 Hooks를 활용한 로직 재사용입니다. API 호출, 상태 관리, 폼 처리 등 복잡한 로직을 분리하여 컴포넌트의 순수성을 유지하고 테스트 가능성을 높입니다.

### **src/lib**
공통 라이브러리 및 도구들을 관리합니다.
- **client**: CSR API 엔드포인트 관리
- **server**: SSR API 엔드포인트 관리

### **src/store**
Zustand를 사용한 전역 상태 관리입니다. 각 도메인별로 스토어를 분리하여 필요한 상태만 구독하고 불필요한 리렌더링을 방지합니다.

### **src/types**
TypeScript의 인터페이스와 타입을 중앙집중식으로 관리합니다. API 응답, 컴포넌트 Props, 도메인 모델 등을 명확하게 정의하여 개발 안정성을 높입니다.

### **src/constants**
매직 스트링(magic string)과 하드코딩된 값들을 제거합니다. 라우트 경로, 메시지, 설정값 등을 한곳에서 관리하여 유지보수성을 향상시킵니다.

### **src/utils**
전역 유틸리티 함수로, 입력 검증, 에러 처리, 데이터 변환 등 애플리케이션 전체에서 필요한 기능들을 담당합니다.

### **tests**
Playwright를 사용한 E2E 테스트입니다. 실제 사용자 관점에서 회원가입, 출석 체크인, 불참사유서 제출 등 핵심 기능 흐름을 자동화하여 배포 전 품질을 검증합니다.

---

### 주요 설계 원칙

1. **도메인 기반 구조**: 기능별로 폴더를 구분하여 확장성과 유지보수성을 확보
2. **단일 책임 원칙**: 각 파일/폴더는 하나의 명확한 책임을 가짐
3. **타입 안정성**: TypeScript를 철저히 활용하여 런타임 에러 사전 방지
4. **성능 최적화**: Next.js의 이미지 최적화, 동적 import, 코드 분할 활용
5. **테스트 가능성**: 로직을 컴포넌트에서 분리하여 E2E 테스트 커버리지 극대화
