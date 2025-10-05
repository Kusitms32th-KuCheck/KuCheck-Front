import Header from '@/components/common/Header'
import Tag from '@/components/common/Tag'

export default function SessionPage() {
  const sessionData = [
    { date: '9/27', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/28', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/29', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/30', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/31', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/32', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/33', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/34', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/35', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/36', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/37', description: '아이디어 발제 및 커피챗', tag: '밋업' },
    { date: '9/38', description: '아이디어 발제 및 커피챗', tag: '밋업' },
  ]

  return (
    <main className="flex items-center justify-center bg-gray-100">
      <div className="desktop:w-[375px] bg-background1 min-h-screen w-full">
        <Header headerType="dynamic" title={'전체 세션 일정'} headerColor={'bg-background1'} />
        <div className="h-[116px]" />
        <div className="mr-[27px] ml-[29px] flex flex-col gap-y-[10px]">
          {sessionData.map((session, index) => {
            const isLast = index === sessionData.length - 1

            return (
              <div className="flex items-center gap-x-[24px]" key={session.date}>
                {/* 타임라인 점과 선 */}
                <div className="relative flex h-[26px] w-[26px] items-center justify-center">
                  {/* 원형 점 */}
                  <div className="bg-primary-200 z-10 h-[12px] w-[12px] rounded-full"></div>

                  {/* 세로 줄 (마지막 아이템 제외) */}
                  {!isLast && (
                    <div className="bg-primary-50 absolute top-2 left-1/2 h-[calc(100%+80px)] w-[2px] -translate-x-1/2"></div>
                  )}
                </div>

                <section className="flex w-full flex-col gap-y-2 rounded-[12px] bg-white px-[26px] py-[17px]">
                  <div className="flex items-center gap-x-2">
                    <p className="body-lg-bold">{session.date}</p>
                    <Tag type={'secondary'} status={'default'}>
                      {session.tag}
                    </Tag>
                  </div>
                  <p className="body-md-regular">{session.description}</p>
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
