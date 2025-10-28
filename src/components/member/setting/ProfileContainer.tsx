import { CameraIcon, ProfileIcon } from '@/assets/svgComponents'

export default function ProfileContainer() {
  return (
    <section className="flex flex-col items-center gap-y-3">
      <div className="relative h-[90px] w-[90px]">
        <ProfileIcon width={90} height={90} />
        <div className="absolute right-0 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-100 bg-white">
          <CameraIcon width={20} height={18} />
        </div>
      </div>
      <p className="body-lg-semibold">이현진</p>
    </section>
  )
}
