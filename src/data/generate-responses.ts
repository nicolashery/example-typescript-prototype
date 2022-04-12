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
      .join(', ')
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
  {
    question: 'Product options',
    response: optional(
      multipleChoices([
        'Red: 2 SMALL',
        'Red: 1 MEDIUM',
        'Blue: 1 MEDIUM',
        'Blue: 1 LARGE',
        'Green: 3 SMALL',
        'Green: 1 LARGE',
        'Yellow: 3 MEDIUM',
        'Yellow: 1 SMALL',
      ])
    ),
  },
  { question: 'Your name', response: faker.name.findName },
  { question: 'Phone number', response: faker.phone.phoneNumberFormat },
  { question: 'Email', response: optional(faker.internet.email) },
  {
    question: 'Preferred contact method',
    response: multipleChoices(['Phone', 'Email']),
  },
  {
    question: 'How satisfied are you with our service?',
    response: () => faker.datatype.number({ min: 1, max: 5 }) + '',
  },
  {
    question: 'Questions and comments',
    response: optional(() =>
      faker.lorem.sentences(faker.datatype.number({ min: 3, max: 10 }))
    ),
  },
]

const run = () => {
  fs.writeFileSync(
    './src/data/order-request-responses.csv',
    stringify(generateFormResponses(orderRequestResponses, 154))
  )
}

run()
