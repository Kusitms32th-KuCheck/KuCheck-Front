import Link from 'next/link'
import { DangerIcon } from '@/assets/svgComponents/member'

interface LoginPageProps {
  // Page 컴포넌트는 searchParams를 props로 직접 받을 수 있습니다.
  searchParams?: { [key: string]: string | string[] | undefined }
}

// 에러 코드에 따른 메시지 매핑
const ERROR_MESSAGES_TITLE: { [key: string]: string } = {
  no_code: '카카오 인증 코드가 없어요',
  unexpected_status: '확인되지 않은 사용자 상태예요',
  unexpected_role: '알 수 없는 사용자 역할이에요',
  authentication_failed: '인증에 실패했어요',
  server_error: '서버에 문제가 발생했어요',
  default: '로그인 중 알 수 없는 오류가 발생했어요',
}

const ERROR_MESSAGES_CONTENT: { [key: string]: string } = {
  no_code: '다시 시도해주세요',
  unexpected_status: '관리자에게 문의해 주세요',
  unexpected_role: '관리자에게 문의해 주세요',
  authentication_failed: '다시 로그인해 주세요',
  server_error: '잠시후 다시 시도해 주세요',
  default: '잠시후 다시 시도해 주세요',
}

/**
 * 에러 메시지를 표시하는 컴포넌트
 */
function ErrorMessage({ errorCode }: { errorCode: string }) {
  const messageTitle = ERROR_MESSAGES_TITLE[errorCode] || ERROR_MESSAGES_TITLE.default
  const messageContent = ERROR_MESSAGES_CONTENT[errorCode] || ERROR_MESSAGES_CONTENT.default
  return (
    <div className="flex flex-col items-center justify-center">
      <DangerIcon width={24} height={24} />
      <p className="body-lg-medium mt-[7px] text-gray-500">{messageTitle}</p>
      <p className="caption-sm-medium mt-[8px] text-gray-400">{messageContent}</p>
    </div>
  )
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorCode = typeof searchParams?.error === 'string' ? searchParams.error : null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-[25px] bg-white">
      {/* errorCode가 존재할 경우에만 ErrorMessage 컴포넌트를 렌더링합니다. */}
      {errorCode && <ErrorMessage errorCode={errorCode} />}

      <Link className="caption-md-semibold rounded-full border border-gray-300 px-3 py-2 text-gray-400" href={'/'}>
        로그인 재시도
      </Link>
    </div>
  )
}
