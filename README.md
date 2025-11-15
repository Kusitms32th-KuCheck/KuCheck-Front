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
