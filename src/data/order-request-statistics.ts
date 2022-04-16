import { QuestionStatistics } from '../statistics'

const responseCount = 154

const statistics: Array<QuestionStatistics> = [
  {
    tag: 'bar',
    statistics: {
      questionId: '6funH6yhl1w',
      title: 'Are you a new or existing customer?',
      data: [
        {
          label: 'I am a new customer',
          value: Math.round(0.73 * responseCount),
        },
        {
          label: 'I am an existing customer',
          value: Math.round(0.27 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: '2pvw12vyuIT',
      title: 'What is the item you would like to order?',
      data: [
        {
          label: '0 words',
          value: Math.round(0 * responseCount),
        },
        {
          label: 'less than 10 words',
          value: Math.round(1 * responseCount),
        },
        {
          label: '10 or more words',
          value: Math.round(0 * responseCount),
        },
      ],
    },
  },
]

export default statistics
