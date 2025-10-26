import Link from 'next/link'

interface LoginPageProps {
  // Page 컴포넌트는 searchParams를 props로 직접 받을 수 있습니다.
  searchParams?: { [key: string]: string | string[] | undefined }
}

// 에러 코드에 따른 메시지 매핑
const ERROR_MESSAGES: { [key: string]: string } = {
  no_code: '카카오 인증 코드가 없습니다. 다시 시도해 주세요.',
  unexpected_status: '확인되지 않은 사용자 상태입니다. 관리자에게 문의하세요.',
  unexpected_role: '알 수 없는 사용자 역할입니다. 관리자에게 문의하세요.',
  authentication_failed: '인증에 실패했습니다. 다시 로그인해 주세요.',
  server_error: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  default: '로그인 중 알 수 없는 오류가 발생했습니다.',
}

/**
 * 에러 메시지를 표시하는 컴포넌트
 */
function ErrorMessage({ errorCode }: { errorCode: string }) {
  const message = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default
  return (
    <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
      <span className="font-medium">오류:</span> {message}
    </div>
  )
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorCode = typeof searchParams?.error === 'string' ? searchParams.error : null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      {/* errorCode가 존재할 경우에만 ErrorMessage 컴포넌트를 렌더링합니다. */}
      {errorCode && <ErrorMessage errorCode={errorCode} />}

      <Link className="body-md-regular text-gray-500" href={'/'}>
        로그인 다시하기
      </Link>
    </div>
  )
}
