'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { allQuestions, Question } from '@/lib/data/questions'
import { useRouter } from 'next/navigation'

let wrongAnswers: any[] = []

const getRandomPracticeQuestions = (): Question[] => {
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}

const practiceQuestions = getRandomPracticeQuestions()

export default function PracticePage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
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
    const next = current + 1
    if (next < practiceQuestions.length) {
      setCurrent(next)
      setShowExplanation(false)
      setSelectedAnswer(null)
    } else {
      setShowScore(true)
    }
  }

  const resetQuiz = () => {
    setScore(0)
    setCurrent(0)
    setShowScore(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
    wrongAnswers = []
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
            <Button onClick={resetQuiz}>다시 시작하기</Button>
            <Button onClick={() => router.push('/wrong-note')} className="mt-2">오답 노트</Button>
          </CardContent>
        ) : (
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{practiceQuestions[current].question}</h2>
            <div className="space-y-2">
              {practiceQuestions[current].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full ${
                    selectedAnswer !== null && index === practiceQuestions[current].answer ? 'bg-green-200' : ''
                  } ${
                    selectedAnswer !== null && index === selectedAnswer && index !== practiceQuestions[current].answer
                      ? 'bg-red-200'
                      : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
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

export { wrongAnswers }
