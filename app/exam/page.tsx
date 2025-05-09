'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { allQuestions, Question } from '@/lib/data/questions'
import { useRouter } from 'next/navigation'
import { wrongAnswers } from '@/lib/state'

const getExamQuestions = (): Question[] => {
  const mcqQuestions = allQuestions.filter(q => q.type === 'mcq')
  const shuffled = mcqQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}

const questions = getExamQuestions()

export default function ExamPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(600)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (submitted) return
    if (timeLeft === 0) {
      handleSubmit()
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, submitted])

  const formatTime = (sec: number) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

  const handleSelect = (idx: number) => {
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1)
  }

  const handleSubmit = () => {
    questions.forEach((q, idx) => {
      if (answers[idx] !== q.answer) {
        wrongAnswers.push({
          question: q.question,
          options: q.options,
          selected: answers[idx],
          correct: q.answer,
          explanation: q.explanation,
          source: 'exam'
        })
      }
    })
    setSubmitted(true)
  }

  const score = answers.reduce((acc, ans, idx) => (ans === questions[idx].answer ? acc + 1 : acc), 0)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => router.push('/')}>홈으로</Button>
        </div>
        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">시험 완료!</h2>
              <p>점수: {score} / {questions.length}</p>
              {questions.map((q, idx) => (
                <div key={idx} className="text-sm">
                  <p className="font-semibold mt-4">{idx + 1}. {q.question}</p>
                  <p className="text-gray-700">당신의 답: {answers[idx] !== null ? q.options[answers[idx]!] : '무응답'}</p>
                  <p className="text-green-600">정답: {q.options[q.answer]}</p>
                  <p className="text-gray-600">해설: {q.explanation}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{current + 1}. {questions[current].question}</h2>
                <span className="text-red-500 font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="space-y-2">
                {questions[current].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full ${answers[current] === idx ? 'bg-blue-200' : ''}`}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={handleNext} disabled={current === questions.length - 1}>다음</Button>
                <Button onClick={handleSubmit} variant="destructive">제출</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
