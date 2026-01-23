import { GuidePointBadge } from './GuidePointBadge'
import { GuideItem } from '@/types/member/absence'

interface GuideItemProps {
  item: GuideItem
}

export function GuideItemComponent({ item }: GuideItemProps) {
  const isArray = Array.isArray(item.text)

  return (
    <div className="flex items-start gap-x-3 py-3">
      {item.point !== undefined && item.pointType && (
        <div className="flex-shrink-0 pt-0.5">
          <GuidePointBadge point={item.point} type={item.pointType} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {item.label && <p className="text-sm font-semibold text-gray-900">{item.label}</p>}

        <div className="mt-1 text-sm text-gray-700">
          {isArray ? (
            <ul className="space-y-1">
              {(item.text as unknown as string[]).map((line, idx) => (
                <li key={idx}>- {line}</li>
              ))}
            </ul>
          ) : (
            <p>{item.text}</p>
          )}
        </div>

        {item.examples && item.examples.length > 0 && (
          <div className="mt-2 rounded bg-gray-50 px-3 py-2">
            <p className="text-xs font-medium text-gray-600">증빙 예시</p>
            <ul className="mt-1 space-y-1">
              {item.examples.map((example, idx) => (
                <li key={idx} className="text-xs text-gray-600">
                  - {example}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
