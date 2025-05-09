// lib/data/questions.ts

export type Question = {
  type: 'mcq' | 'ox'
  question: string
  options: string[]
  answer: number
  explanation: string
  topic: string
}

export const allQuestions: Question[] = [
  {
    type: 'mcq',
    question: '준강도에 관한 설명으로 틀린 것은?',
    options: [
      '1. 준강도의 주체는 절도이다.',
      '2. 준강도의 주체에 단순절도 미수범은 포함되지 않는다.',
      '3. 준강도는 절도가 체포면탈을 목적으로 폭행 또는 협박하는 것을 포함한다.',
      '4. 준강도의 기수여부 판단기준은 절도행위 여부를 기준으로 한다.'
    ],
    answer: 1,
    explanation: '단순절도 미수범도 준강도의 주체가 될 수 있으므로 틀린 설명입니다.',
    topic: '준강도'
  },
  {
    type: 'ox',
    question: '정당방위는 현재의 부당한 침해에 대한 방어행위여야 한다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '형법 제21조에 따른 정당방위 요건입니다.',
    topic: '정당방위'
  },
  {
    type: 'ox',
    question: '긴급피난은 자신의 법익을 보호하기 위한 위난 회피의 행위다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '긴급피난은 자기 또는 타인을 위한 위난 회피 수단입니다.',
    topic: '긴급피난'
  },
  {
    type: 'ox',
    question: '미수범은 결과가 발생하지 않아도 처벌할 수 있다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '미수범은 실행 착수 후 결과가 발생하지 않아도 처벌됩니다.',
    topic: '미수'
  },
  {
    type: 'ox',
    question: '폭행죄는 피해자가 상해를 입어야 성립한다.',
    options: ['O', 'X'],
    answer: 1,
    explanation: '폭행죄는 폭행의 결과가 없어도 성립합니다.',
    topic: '폭행'
  },
  {
    type: 'ox',
    question: '상해죄는 폭행에 의해 피해자의 신체에 손상이 발생해야 한다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '상해죄는 상해의 결과가 필요합니다.',
    topic: '상해'
  },
  {
    type: 'ox',
    question: '과실치사상죄는 주의의무 위반이 있는 경우에만 성립한다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '과실범은 주의의무 위반이 있을 때 성립합니다.',
    topic: '과실치사상'
  },
  {
    type: 'ox',
    question: '강간죄는 피해자가 반드시 성인인 경우에만 성립한다.',
    options: ['O', 'X'],
    answer: 1,
    explanation: '피해자의 연령과 관계없이 동의 없는 간음이면 성립합니다.',
    topic: '강간'
  },
  {
    type: 'ox',
    question: '살인죄는 사람을 죽이려는 고의가 있어야 성립한다.',
    options: ['O', 'X'],
    answer: 0,
    explanation: '살인죄는 고의가 있는 경우 성립합니다.',
    topic: '살인'
  },
  {
    type: 'ox',
    question: '구성요건적 착오는 법률적 평가를 잘못 이해한 경우를 말한다.',
    options: ['O', 'X'],
    answer: 1,
    explanation: '구성요건적 착오는 사실관계의 오인을 의미합니다.',
    topic: '구성요건적 착오'
  }
  // 나머지 객관식 문제도 이어붙일 수 있어
]
