'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      <h1 className="text-3xl font-bold">형법 퀴즈 앱</h1>
      <div className="flex flex-col space-y-3 w-60">
        <Button onClick={() => router.push('/practice')}>연습 모드</Button>
        <Button onClick={() => router.push('/exam')}>시험 모드</Button>
        <Button onClick={() => router.push('/wrong-note')}>오답 노트</Button>
      </div>
    </main>
  )
}

