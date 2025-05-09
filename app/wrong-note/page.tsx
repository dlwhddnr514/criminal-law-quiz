'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { wrongAnswers } from '@/lib/state'
import { useRouter } from 'next/navigation'

export default function WrongNotePage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  const filtered = wrongAnswers
  const hasWrongAnswers = filtered.length > 0

  const next = () => {
    if (current < filtered.length - 1) setCurrent(current + 1)
  }

  const prev = () => {
    if (current > 0) setCurrent(current - 1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-xl p-6">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">오답 노트</h2>
            <Button onClick={() => router.push('/')}>홈으로</Button>
          </div>
          {hasWrongAnswers ? (
            <div>
              <p className="text-sm text-gray-500 mb-2">문제 출처: {filtered[current].source === 'exam' ? '시험 모드' : '연습 모드'}</p>
              <h3 className="text-lg font-semibold mb-2">{filtered[current].question}</h3>
              <ul className="space-y-2 mb-4">
                {filtered[current].options.map((opt: string, idx: number) => (
                  <li key={idx} className={`p-2 rounded ${idx === filtered[current].correct ? 'bg-green-100' : idx === filtered[current].selected ? 'bg-red-100' : ''}`}>
                    {opt}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mb-4">해설: {filtered[current].explanation}</p>
              <div className="flex justify-between">
                <Button onClick={prev} disabled={current === 0}>이전</Button>
                <Button onClick={next} disabled={current === filtered.length - 1}>다음</Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">오답이 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
