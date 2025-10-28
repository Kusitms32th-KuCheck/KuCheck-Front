import { GuideItemComponent } from '@/components/member/reason-for-absence/GuideItemComponent'
import { GuideSection } from '@/types/member/absence'

interface GuideSectionProps {
  section: GuideSection
}

export function GuideSectionComponent({ section }: GuideSectionProps) {
  const isDescriptionArray = Array.isArray(section.description)

  return (
    <section className="border-b border-gray-200 px-5 py-7">
      <h3 className="body-lg-semibold mb-3 text-gray-700">{section.title}</h3>

      {section.description && (
        <div className="caption-md-regular mb-4 text-gray-600">
          {isDescriptionArray ? (
            <div className="space-y-1">
              {(section.description as unknown as string[]).map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          ) : (
            <p>{section.description}</p>
          )}
        </div>
      )}

      {section.content && section.content.length > 0 && (
        <div className="space-y-2 divide-y divide-gray-100">
          {section.content.map((item, idx) => (
            <GuideItemComponent key={item.id || idx} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
