'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { allQuestions, Question } from '@/lib/data/questions'
import { wrongAnswers } from '@/lib/state'
import { useRouter } from 'next/navigation'

const getPracticeQuestions = (): Question[] => {
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}

const practiceQuestions = getPracticeQuestions()

export default function PracticePage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showScore, setShowScore] = useState(false)
  const router = useRouter()

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === practiceQuestions[current].answer) {
      setScore(score + 1)
    } else {
      wrongAnswers.push({
        question: practiceQuestions[current].question,
        options: practiceQuestions[current].options,
        selected: index,
        correct: practiceQuestions[current].answer,
        explanation: practiceQuestions[current].explanation,
        source: 'practice'
      })
    }
  }

  const handleNext = () => {
    if (current < practiceQuestions.length - 1) {
      setCurrent(current + 1)
      setShowExplanation(false)
      setSelectedAnswer(null)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-end mb-4">
          <Button onClick={() => router.push('/')}>홈으로</Button>
        </div>
        {showScore ? (
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">퀴즈 완료!</h2>
            <p className="mb-4">점수: {score} / {practiceQuestions.length}</p>
            <Button onClick={() => router.push('/wrong-note')}>오답 노트</Button>
          </CardContent>
        ) : (
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{practiceQuestions[current].question}</h2>
            <div className="space-y-2">
              {practiceQuestions[current].options.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full ${
                    selectedAnswer !== null && idx === practiceQuestions[current].answer ? 'bg-green-200' : ''
                  } ${
                    selectedAnswer !== null && idx === selectedAnswer && idx !== practiceQuestions[current].answer
                      ? 'bg-red-200'
                      : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {showExplanation && (
              <div className="mt-4 text-sm text-gray-700">
                해설: {practiceQuestions[current].explanation}
              </div>
            )}
            {showExplanation && (
              <Button onClick={handleNext} className="mt-4">다음 문제</Button>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
