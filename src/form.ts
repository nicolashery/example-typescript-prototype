import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  11
)

export type FormId = string

export type Form = {
  id: FormId
  name: string
  published: boolean
}

export const generateFormId = (): FormId => {
  return nanoid()
}
