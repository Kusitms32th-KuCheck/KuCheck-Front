// /src/components/attendance/GuidePointBadge.tsx
interface GuidePointBadgeProps {
  point: number
  type: 'penalty' | 'reward'
}

export function GuidePointBadge({ point, type }: GuidePointBadgeProps) {
  const isPenalty = type === 'penalty'
  const bgColor = isPenalty ? 'bg-red-100' : 'bg-green-100'
  const textColor = isPenalty ? 'text-red-600' : 'text-green-600'

  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${bgColor} text-xs font-bold ${textColor}`}
    >
      {isPenalty ? point : `+${point}`}
    </span>
  )
}
