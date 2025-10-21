import { redirect } from 'next/navigation'
import { SearchParams } from '@/types/common'
import { postAuthKaKao } from '@/lib/common'

export default async function RedirectPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const code = typeof params.code === 'string' ? params.code : null

  if (!code) {
    console.error('No code provided')
    return <div>코드가 없습니다</div>
  }

  const result = await postAuthKaKao(code)

  if (!result.success) {
    redirect(`/login?error=${result.error}`)
  }

  const { status, role } = result

  if (status === 'PENDING') {
    redirect('/sign-up')
  } else if (role === 'USER') {
    redirect('/member')
  } else if (role === 'ADMIN') {
    redirect('/manager')
  }

  redirect('/')
}
