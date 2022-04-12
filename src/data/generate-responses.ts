import * as fs from 'fs'
import { faker } from '@faker-js/faker'
import { stringify } from 'csv-stringify/sync'

type ResponseDefinition = {
  question: string
  response: ResponseGenerator
}

type ResponseGenerator = () => string

const optional = (response: ResponseGenerator): ResponseGenerator => {
  return () => (faker.datatype.boolean() ? response() : '')
}

const singleChoice = (choices: Array<string>): ResponseGenerator => {
  return () => faker.random.arrayElement(choices)
}

const multipleChoices = (choices: Array<string>): ResponseGenerator => {
  return () =>
    faker.random
      .arrayElements(
        choices,
        faker.datatype.number({ min: 1, max: choices.length })
      )
      .join(',')
}

const generateFormResponses = (
  definitions: Array<ResponseDefinition>,
  count: number
): Array<Array<string>> => {
  const result = []

  // Header
  result.push(['Response number'].concat(definitions.map((d) => d.question)))

  // Responses
  let currentResponseNumber: number = 1
  while (currentResponseNumber <= count) {
    result.push(
      [currentResponseNumber + ''].concat(definitions.map((d) => d.response()))
    )
    currentResponseNumber++
  }

  return result
}

const orderRequestResponses: Array<ResponseDefinition> = [
  {
    question: 'Are you a new or existing customer?',
    response: optional(
      singleChoice(['I am a new customer', 'I am an existing customer'])
    ),
  },
  {
    question: 'What is the item you would like to order?',
    response: singleChoice([
      'JF72HSY0',
      'AK10BBZ7',
      'MB917ZH5',
      '0B7ANSH6',
      '01N58XNS',
      '1928SJWN',
    ]),
  },
  {
    question: 'What color(s) would you like to order?',
    response: optional(multipleChoices(['Red', 'Blue', 'Green', 'Yellow'])),
  },
]

const run = () => {
  fs.writeFileSync(
    './src/data/order-request-responses.csv',
    stringify(generateFormResponses(orderRequestResponses, 10))
  )
}

run()
