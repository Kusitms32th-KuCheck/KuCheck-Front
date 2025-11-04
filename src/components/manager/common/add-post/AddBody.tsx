import {
  Tiptap1Icon,
  Tiptap2Icon,
  Tiptap3Icon,
  Tiptap4Icon,
  Tiptap5Icon,
  Tiptap6Icon,
  Tiptap7Icon,
} from '@/assets/svgComponents/manager'
export default function AddBody() {
  const icons = [Tiptap1Icon, Tiptap2Icon, Tiptap3Icon, Tiptap4Icon, Tiptap5Icon, Tiptap6Icon, Tiptap7Icon]

  return (
    <div className="mt-6 w-full pb-6">
      <div className="mb-6 min-h-[778px] rounded-2xl bg-white">
        <div className="flex border-b">
          {icons.map((Icon, idx) => (
            <button
              key={idx}
              type="button"
              className={`p-[7px] ${[0, 3, 5].includes(idx) ? 'border-r border-gray-200' : ''}`}
            >
              <Icon width={32} height={32} />
            </button>
          ))}
        </div>
        <div className="p-6">내용</div>
      </div>
    </div>
  )
}
