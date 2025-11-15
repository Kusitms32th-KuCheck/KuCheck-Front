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
│   ├── assets/                      # icons
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

---

## 📈 개선 경험

### 1️⃣ 출석체크 페이지 이미지 로딩 속도가 느리다

| 목차 | 설명 |
|------|-------------|
| 문제 상황 | 저희 서비스 메인 로직인 출석체크 페이지에서 나의 프로필을 불러오는 이미지 부분의 로딩 속도가 현저하게 떨어지는 문제가 발생하였습니다. <br /><br /> **LCP 29.6초**, **실질적인 체감으로는 5-6초 정도 이후 이미지가 로드** 되는 문제점이 있었습니다. <br /><br /> 충분히 사용자가 느끼기도 **"느리다"** 판단될 것이라 생각하였고, 이 때문에 전체적인 앱서비스 완성도가 떨어져보이는 문제점이 있다고 판단하여 개선을 진행하였습니다. <img width="3456" height="2082" alt="image" src="https://github.com/user-attachments/assets/b7465acc-2dce-4369-8bff-15df259ff68f" />|
| 해결 과정 | 처음에는 Image 태그 속성의 `fetchPriority={'high'}` 와 이미지 사이즈를 지정하여 이미지 최적화를 진행해보았고, next.config.js 이미지 리사이징 설정, 캐시 설정을 진행하여 LCP 지수를 감소시키고자 하였습니다. <br /><br /> `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]` <br /> `imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]` <br /> `minimumCacheTTL: 60 * 60 * 24 * 365` <br /><br /> 하지만 여전히 동일한 성능 지수를 나타내고 있었고, Image 태그 속성만으로는 이미지 최적화가 어렵겠다는 판단을 하게 되었습니다. Cloudinary, ImageKit, UploadCare와 같은 이미지 최적화 라이브러리 사용을 고려했으나, **근본적인 문제를 포장하기 위해 또 다른 라이브러리를 추가하는 것이 과연 올바른 해결책인가** 하는 의문이 들었습니다. <br /><br /> 따라서 사고를 전환하여 **"아예 업로드 단계에서 이미지 용량을 줄여볼까?"** 하는 접근을 시도했습니다. 저희 서비스는 출석체크, 상벌점, 세션 장소 공지 등이 주요 기능이었기 때문에 이미지는 중요도가 낮았습니다. 특히 출석체크 페이지의 프로필 이미지는 모바일 화면에서만 사용되므로 큰 크기와 용량이 필요하지 않았습니다. <br /><br /> **[1] 이미지 리사이징** <br /> 종횡비 유지하며 최대 크기 제한: <br /> `let { width, height } = img` <br /> `const aspectRatio = width / height` <br /> `if (width > maxWidth) { width = maxWidth; height = width / aspectRatio }` <br /> `if (height > maxHeight) { height = maxHeight; width = height * aspectRatio }` <br /> 📊 효과: 4000×3000 → 1920×1080 축소 시 파일 크기 대폭 감소 <br /><br /> **[2] Canvas 화질 최적화** <br /> 리사이징 시 이미지 품질 보존: <br /> `ctx.imageSmoothingEnabled = true` <br /> `ctx.imageSmoothingQuality = 'high'` <br /> 📊 효과: 품질 저하로 인한 재압축 방지, 단일 최적화 단계로 효율화 <br /><br /> **[3] Quality 파라미터 제어** <br /> JPEG 압축률 최적화: `quality = 0.8` <br /> 📊 효과: 지각할 수 없는 수준의 손실 압축으로 파일 크기 최적화 <br /><br /> **[4] 정수 반올림으로 렌더링 최적화** <br /> 소수점 캔버스 크기 제거: <br /> `canvas.width = Math.round(width)` <br /> `canvas.height = Math.round(height)` <br /> 📊 효과: 렌더링 성능 향상, 캔버스 그리기 시간 단축 (29초 → 18초) <img width="3440" height="2062" alt="image" src="https://github.com/user-attachments/assets/91d6711e-da24-4a87-8959-96bde17bd0ca" /><br /><br /> **[5] WebP 변환** <br /> 확장자를 JPEG/PNG에서 WebP로 변경: <br /> `if (shouldConvertToWebP) { blob = await convertToWebP(canvas, quality) }` <br /> 📊 효과: 20~30% 크기 감소로 이미지 다운로드 시간 단축 |
| 결과 | **LCP 성능 지수 개선: 29.6초 → 18.8초 → 13.8초** <br /><br /> 업로드 단계에서의 이미지 리사이징, Canvas 화질 최적화, Quality 파라미터 제어, 정수 반올림, WebP 변환 등 다양한 최적화 기법을 조합하여 **74% 성능 개선**을 달성했습니다. <br /><br /> 백엔드 개발자분들의 적극적인 협력으로 WebP 확장자 지원을 추가하여 이미지 다운로드 시간을 추가로 단축할 수 있었습니다. <br /><br /> 현재도 학회원분들, 멘토링, AI 등을 통해 추가적인 이미지 최적화 방안을 지속적으로 연구 중입니다. <img width="3456" height="2164" alt="image" src="https://github.com/user-attachments/assets/d2ab348e-ddb6-4b62-84ca-b73da3557db7" />|

### 2️⃣ 출석체크 페이지 초기 로딩 속도가 느리다

| 목차 | 설명 |
|------|-------------|
| 문제 상황 | IT 경영학회 큐시즘의 출석체크 앱서비스 구현 중, 가장 중요한 출석체크 페이지의 **FCP(First Contentful Paint)가 현저하게 저하**되었습니다. <br /><br /> 실제 사용자가 QR코드를 인식하려면 **아무것도 보이지 않은 상태로 3-4초 정도 대기**해야 하고, 화면이 로딩되면 QR코드를 인식해야 하는 상황이었습니다. <br /><br /> 이는 사용자의 불편을 야기할 수 있으므로, **FCP 성능 증가 및 로딩 중 사용자 경험 개선**이 필요했습니다. <img width="3456" height="2082" alt="image" src="https://github.com/user-attachments/assets/e2ab9417-03c2-4b84-ac12-fb8ae8fa911e" />|
| 해결 과정 | **[1] Dynamic Import - QRCode 비동기 로드** <br /> qrcode.react 라이브러리는 약 20-30KB 용량을 가지고 있었고, 초기 페이지 로드 시 무조건 다운로드되고 있었습니다. <br /><br /> 개선 전: `import { QRCodeSVG } from 'qrcode.react'` (메인 번들에 포함) <br /><br /> 개선 후: `const QRCodeSVG = dynamic(() => import('qrcode.react').then(...), { ssr: false, loading: () => <스켈레톤UI /> })` <br /><br /> 효과: <br /> - 페이지 초기 로드 시 QRCodeSVG 코드 제외 <br /> - 렌더링 시 스켈레톤 UI 먼저 표시 <br /> - 백그라운드에서 라이브러리 비동기 다운로드 <br /> - 로드 완료 후 스켈레톤이 실제 QRCode로 교체 <br /> 📊 로딩 중 사용자가 페이지 변화를 감지할 수 있어 불안감 제거 <br /><br /> **[2] useCallback - 함수 메모이제이션** <br /> 개선 전: `const startTimer = (expAtValue: string) => { ... }` <br /> useEffect 내 expAt, token 변경 시마다 새로운 함수 객체 생성 <br /><br /> 개선 후: `const startTimer = useCallback((expAtValue: string) => { ... }, [])` <br /> 📊 효과: 함수 참조 유지, 자식 컴포넌트의 불필요한 리렌더링 방지, 메모리 효율성 증가 <br /><br /> **[3] useMemo - 계산 결과 캐싱** <br /> 개선 전: 남은 초(remainingSeconds)가 매초 업데이트될 때마다 `qrData = JSON.stringify({ token: tokenData.token })` 재계산 <br /> 10분 진행 시 600번의 불필요한 리렌더링 발생 <br /><br /> 개선 후: `const qrData = useMemo(() => (tokenData?.token ? JSON.stringify(...) : ''), [tokenData?.token])` <br /> 📊 효과: token 변경 시만 qrData 재계산, remainingSeconds 업데이트 시 캐싱된 값 사용으로 불필요한 렌더링 제거 |
| 결과 | **FCP 성능 향상: 5.6초 → 1.7초** <br /><br /> **LightHouse 기준 성능지수: 13% 개선** <br /><br /> Dynamic Import, useCallback, useMemo를 조합하여 초기 로딩 속도를 획기적으로 개선하고, 사용자가 로딩 중임을 인지할 수 있는 스켈레톤 UI로 경험을 개선했습니다. 이를 통해 출석체크 프로세스의 사용성이 크게 향상되었습니다. <img width="3456" height="2078" alt="image" src="https://github.com/user-attachments/assets/c7814e06-c113-4f23-b95b-fed5326f0b52" />|

### 3️⃣ E2E 테스트 코드로 회원가입 페이지 타입 안정화

| 목차 | 설명 |
|------|-------------|
| 문제 상황 | UT세션 준비를 위해 QA를 진행하는 과정에서 예상치 못한 사용자 입력들이 발견되었습니다. <br /><br /> **이름 필드**: 황유림**><**, **ㅁㅇㅁㄴ**, **너무 긴 이름** <br /> **전화번호 필드**: 101-421 (불완전한 입력) <br /> **악의적 입력**: **&lt;script&gt;&lt;/script&gt;** (XSS 공격 시도) <br /><br /> 농담식으로 스크립트 코드를 넣기도 했지만, 실제 서비스 사용 중 예상과 다르게 입력하는 사용자는 분명히 발생할 것으로 예상되었습니다. <br /><br /> 이러한 변수들을 최대한 제어하고 대응하기 위해 **E2E 테스트 코드 도입의 필요성**을 인식하게 되었습니다. |
| 해결 과정 | 다양한 테스트 도구 중 **Playwright 기반의 E2E 테스트**를 선택했습니다. 이유는 사용자 시나리오를 직접 설정하여 실제 사용자 흐름대로 서비스가 문제없이 동작하는지 검증할 수 있기 때문입니다. <br /><br /> 회원가입은 Step별로 구성되어 있었고 (Step 1: 이름 입력, Step 2: 학과 입력 등), 각 Step에서 요구되는 기능들을 검증했습니다. <br /><br /> **과한 테스트보다는 목적 지향적인 테스트 작성**: 다른 기능 구현이 남아있어 리소스 낭비를 피하고, **다양한 입력을 하는 사용자를 제어하기 위한 테스트 코드**에 집중했습니다. <br /><br /> **테스트 작성 후 발견된 이슈**: disable 처리, error 로직 미흡 등이 드러났고, 테스트에서 통과하지 못한 케이스들을 예외처리했습니다. <br /><br /> **[1] 이름 유효성 검증** <br /> `validateName(name)`: 빈 값 체크, 최소/최대 길이(1-100자) 검증, 한글/영문/공백만 허용 <br /> 특수문자 제거: `/^[가-힣a-zA-Z\s]+$/` 정규식으로 한글, 영문만 허용 <br /> 📊 효과: 예상 밖의 이름 입력 차단 <br /><br /> **[2] 휴대폰 번호 유효성 검증** <br /> `isValidPhoneNumber(phoneNumber)`: 010, 02~064 지역번호 포함 모든 유효한 형식 검증 <br /> 정규식: `/^(010-\d{4}-\d{4}|0(2|31|32|...)-\d{3,4}-\d{4})$/` <br /> 📊 효과: 불완전하거나 잘못된 전화번호 입력 방지 <br /><br /> **[3] 휴대폰 에러 메시지 처리** <br /> `getPhoneNumberErrorMessage(phoneNumber)`: 입력 없을 때, 13자 미만, 유효하지 않은 형식 등 상황별 에러 메시지 제공 <br /> 📊 효과: 사용자에게 명확한 피드백 제공 |
| 결과 | **테스트 통과율: 64% → 100%** <br /><br /> <img width="1231" height="682" alt="image" src="https://github.com/user-attachments/assets/97eddd4c-8c63-496e-865b-66501000025a" /> <img width="2524" height="1498" alt="image" src="https://github.com/user-attachments/assets/8dd79607-3c42-4295-b878-1160dc047a90" /> 체계적인 입력 검증으로 회원가입 프로세스의 모든 시나리오를 안정적으로 제어할 수 있게 되었습니다. <br /><br /> 현재 입력을 받는 기능 2가지 중 회원가입에 이어 **다른 입력 기능에도 동일한 E2E 테스트를 적용 중**입니다. |


## ⚒️ 사용 아키텍쳐
### 📲 BBF 패턴 (Backend-Based Fetching)

### 핵심
클라이언트 → **Route Handler** → 백엔드
(토큰은 서버에 보관, XSS 공격 방지)

---

### Route Handler 작성 패턴

#### GET
```typescript
export async function GET() {
  const { data, error } = await apiCallServer('/v1/endpoint', {
    method: 'GET',
  })
  if (error) return Response.json({ error }, { status: 400 })
  return Response.json({ success: true, data })
}
```

#### POST with 검증
```typescript
export async function POST(request: Request) {
  const body = await request.json()
  if (!body.id) return Response.json({ error: 'id required' }, { status: 400 })
  
  const { data, error } = await apiCallServer('/v1/endpoint', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (error) return Response.json({ error }, { status: 400 })
  return Response.json({ success: true, data })
}
```

#### 동적 라우트
```typescript
export async function GET(
  { params }: { params: { id: string } }
) {
  if (!params.id) return Response.json({ error: 'id required' }, { status: 400 })
  
  const { data, error } = await apiCallServer(`/v1/endpoint/${params.id}`, {
    method: 'GET',
  })
  if (error) return Response.json({ error }, { status: 400 })
  return Response.json(data)
}
```

---

### 클라이언트 사용
```typescript
// ✅ 올바른 사용
const res = await fetch('/api/absence', { method: 'POST' })

// ❌ 절대 금지
import { apiCallServer } from '@/lib/api.server'  // 에러!
```

---

### 폴더 구조
```
src/app/api/
├── absence/route.ts
├── absence/manage/route.ts
├── absence/manage/[sessionId]/route.ts
├── attendance/...
├── auth/cookies/route.ts
└── points/manage/...

src/lib/
├── api.server.ts        # 핵심 함수
└── auth.server.ts       # 토큰 관리
```

