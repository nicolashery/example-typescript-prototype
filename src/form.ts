import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  11
)

export type FormId = string
export type QuestionId = string
export type ChoiceId = string

export const generateFormId = (): FormId => {
  return nanoid()
}

export const generateQuestionId = (): QuestionId => {
  return nanoid()
}

export const generateChoiceId = (): ChoiceId => {
  return nanoid()
}

export type Form = {
  id: FormId
  name: string
  published: boolean
  questions: Array<FormQuestion>
}

export type FormQuestion =
  | { tag: 'shortText'; question: Question<ShortText> }
  | { tag: 'longText'; question: Question<LongText> }
  | { tag: 'singleChoice'; question: Question<SingleChoice> }
  | { tag: 'multipleChoice'; question: Question<MultipleChoice> }
  | { tag: 'scale'; question: Question<Scale> }

export type QuestionType = FormQuestion['tag']

export const allQuestionTypes: Array<QuestionType> = [
  'shortText',
  'longText',
  'singleChoice',
  'multipleChoice',
  'scale',
]

export type Question<T> = {
  id: QuestionId
  title: string
  description: string | null
  required: boolean
  definition: T
}

export type ShortText = null

export type LongText = null

export type Choice = {
  id: ChoiceId
  value: string
}

export type SingleChoice = Array<Choice>

export type MultipleChoice = Array<Choice>

export type Scale = {
  start: number
  end: number
  startLabel: string
  endLabel: string
}
