'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { wrongAnswers as practiceWrongAnswers } from '../practice/page'
import { wrongAnswers as examWrongAnswers } from '../exam/page'
import { useRouter } from 'next/navigation'

export default function WrongNotePage() {
  const [current, setCurrent] = useState(0)
  const [filter, setFilter] = useState<'all' | 'practice' | 'exam'>('all')
  const router = useRouter()

  const combinedAnswers = [...practiceWrongAnswers, ...examWrongAnswers]
  const filteredAnswers =
    filter === 'all'
      ? combinedAnswers
      : combinedAnswers.filter((q) => q.source === filter)

  if (filteredAnswers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-700 mb-4">오답이 없습니다.</p>
        <Button onClick={() => router.push('/')}>홈으로</Button>
      </div>
    )
  }

  const currentData = filteredAnswers[current]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">오답 노트</h2>

          <div className="flex gap-2 mb-4">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
              전체
            </Button>
            <Button variant={filter === 'practice' ? 'default' : 'outline'} onClick={() => setFilter('practice')}>
              연습 모드
            </Button>
            <Button variant={filter === 'exam' ? 'default' : 'outline'} onClick={() => setFilter('exam')}>
              시험 모드
            </Button>
          </div>

          <p className="mb-2 text-sm text-gray-600">
            출제 유형: {currentData.source === 'exam' ? '시험 모드' : '연습 모드'}
          </p>
          <p className="font-semibold mb-2">{current + 1}. {currentData.question}</p>
          <div className="space-y-1 mb-3">
            {currentData.options.map((opt: string, idx: number) => (
              <div
                key={idx}
                className={`p-2 rounded border text-sm
                  ${idx === currentData.correct ? 'bg-green-100' : ''}
                  ${idx === currentData.selected && idx !== currentData.correct ? 'bg-red-100' : ''}`}
              >
                {opt}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-700 mb-4">해설: {currentData.explanation}</p>

          <div className="flex justify-between mb-4">
            <Button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>이전</Button>
            <Button onClick={() => setCurrent((c) => Math.min(filteredAnswers.length - 1, c + 1))} disabled={current === filteredAnswers.length - 1}>다음</Button>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => router.push('/')}>홈으로</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
