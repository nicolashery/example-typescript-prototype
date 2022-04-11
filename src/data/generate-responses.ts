import { faker } from '@faker-js/faker'
import { stringify } from 'csv-stringify/sync'

const count: number = 10

let currentResponseId: number = 1
let responses: Array<Array<string>> = []
responses.push([
  'id',
  'Are you a new or existing customer?',
  'What is the item you would like to order?',
  'What color(s) would you like to order?',
])
while (currentResponseId <= count) {
  const response: Array<string> = [
    currentResponseId + '',
    faker.datatype.boolean()
      ? faker.random.arrayElement([
          'I am a new customer',
          'I am an existing customer',
        ])
      : '',
    faker.random.arrayElement([
      'JF72HSY0',
      'AK10BBZ7',
      'MB917ZH5',
      '0B7ANSH6',
      '01N58XNS',
      '1928SJWN',
    ]),
    faker.datatype.boolean()
      ? faker.random
          .arrayElements(
            ['Red', 'Blue', 'Green', 'Yellow'],
            faker.datatype.number({ min: 1, max: 4 })
          )
          .join(',')
      : '',
  ]

  responses.push(response)

  currentResponseId++
}

console.log(stringify(responses))
console.log()
