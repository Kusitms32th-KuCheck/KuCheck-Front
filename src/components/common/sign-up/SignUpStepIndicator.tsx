'use client'

import { useSearchParams } from 'next/navigation'

export default function SignUpStepIndicator() {
  const searchParams = useSearchParams()
  const step = searchParams.get('step') || '1'

  return <div className="body-lg-medium absolute right-5 text-gray-400">{step}/6</div>
}
