import { ChevronDownIcon, ChevronUpIcon } from '@/assets/svgComponents/member'

interface MemberDropDownProps {
  children: React.ReactNode
  isDropDownOpen: boolean
  setIsDropDownOpen: () => void
  selectedContent: string | undefined
  placeHolder: string
}

export default function MemberDropDown({
  children,
  setIsDropDownOpen,
  isDropDownOpen,
  placeHolder,
  selectedContent,
}: MemberDropDownProps) {
  return (
    <div className="flex w-full flex-col gap-y-[9px]">
      <section
        onClick={setIsDropDownOpen}
        className="flex w-full justify-between rounded-[12px] border border-gray-300 px-[14px] py-3 pr-[17.5px]"
      >
        <p className="body-lg-medium text-gray-500">{selectedContent ? selectedContent : placeHolder}</p>
        {isDropDownOpen ? <ChevronUpIcon width={24} height={24} /> : <ChevronDownIcon width={24} height={24} />}
      </section>
      {isDropDownOpen ? (
        <section className="flex w-full flex-col gap-y-[4px] overflow-y-scroll rounded-[12px] shadow-[0_0_12px_0_rgba(9,44,219,0.15)]">
          {children}
        </section>
      ) : null}
    </div>
  )
}
