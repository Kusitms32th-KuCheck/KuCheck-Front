'use client'

import ImageUploader from '@/components/common/sign-up/ImageUploader'

export default function StudentCardUploadField() {
  return (
    <div>
      <div className="flex flex-col gap-y-[72px]">
        <section className="flex flex-col gap-y-4 px-5">
          <h1 className="heading-lg-semibold">사진을 업로드 해주세요</h1>
          <p className="body-lg-regular text-gray-500">
            얼굴이 잘 보이는 사진을 등록해 주세요 <br />
            출석 시 본인 확인 용도로만 사용돼요
          </p>
        </section>
        <ImageUploader />
      </div>
    </div>
  )
}
