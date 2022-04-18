import { QuestionId } from './form'

export type QuestionStatistics =
  | { tag: 'bar'; statistics: Statistics<Bar> }
  | { tag: 'pie'; statistics: Statistics<Pie> }
  | { tag: 'scale'; statistics: Statistics<Scale> }

export type Statistics<T> = {
  questionId: QuestionId
  title: string
  data: T
}

export type Bar = Array<{ label: string; value: number }>
export type Pie = Array<{ label: string; value: number }>
export type Scale = {
  startLabel: string
  endLabel: string
  values: Array<{ label: string; value: number }>
}
