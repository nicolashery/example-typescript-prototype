import { QuestionId } from './form'

export type QuestionStatistics =
  | { tag: 'bar'; statistics: Statistics<Bar> }
  | { tag: 'pie'; statistics: Statistics<Pie> }

export type Statistics<T> = {
  questionId: QuestionId
  title: string
  data: T
}

export type Bar = Array<{ label: string; value: number }>
export type Pie = Array<{ label: string; value: number }>
