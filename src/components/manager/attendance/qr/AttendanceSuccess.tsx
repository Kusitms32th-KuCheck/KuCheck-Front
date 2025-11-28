import { QrCheckIcon, QrErrorIcon } from '@/assets/svgComponents/manager'

interface AttendanceSuccessProps {
  name: string
  avatarUrl?: string
  className?: string
  status?: 'success' | 'error'
  errorMessage?: string | null
}

export default function AttendanceSuccess({
  name,
  className = '',
  status = 'success',
  errorMessage = null,
}: AttendanceSuccessProps) {
  const isSuccess = status === 'success'
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 text-sm text-gray-800 shadow-md ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          {isSuccess ? <QrCheckIcon width={36} height={36} /> : <QrErrorIcon width={36} height={36} />}
        </div>
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className="font-medium text-lg pr-3">{isSuccess && `${name}님의 출석체크가 완료되었어요`}</span>
        {!isSuccess && errorMessage ? <span className="text-lg text-red-600 pr-3">{errorMessage}</span> : null}
      </div>
    </div>
  )
}
