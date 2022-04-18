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
  {
    tag: 'bar',
    statistics: {
      questionId: 'VusI9Np62Gu',
      title: 'What color(s) would you like to order',
      data: [
        {
          label: 'Red',
          value: Math.round(0.3 * responseCount),
        },
        {
          label: 'Blue',
          value: Math.round(0.55 * responseCount),
        },
        {
          label: 'Green',
          value: Math.round(0.45 * responseCount),
        },
        {
          label: 'Yellow',
          value: Math.round(0.35 * responseCount),
        },
        {
          label: '(No response)',
          value: Math.round(0.2 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: '6GpGeIUd0oB',
      title: 'Choose size and number per color',
      data: [
        {
          label: '0 words',
          value: Math.round(0.36 * responseCount),
        },
        {
          label: 'less than 50 words',
          value: Math.round(0.64 * responseCount),
        },
        {
          label: '50 or more words',
          value: Math.round(0 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: '1zv6A33Xziq',
      title: 'Your name',
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
  {
    tag: 'pie',
    statistics: {
      questionId: 'TYkE81nSkHm',
      title: 'Phone number',
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
  {
    tag: 'pie',
    statistics: {
      questionId: 'PfGdb7GW1r1',
      title: 'Email',
      data: [
        {
          label: '0 words',
          value: Math.round(0.26 * responseCount),
        },
        {
          label: 'less than 10 words',
          value: Math.round(0.74 * responseCount),
        },
        {
          label: '10 or more words',
          value: Math.round(0 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'bar',
    statistics: {
      questionId: 'YFCnjOKZSTS',
      title: 'Preferred contact method',
      data: [
        {
          label: 'Phone',
          value: Math.round(0.4 * responseCount),
        },
        {
          label: 'Email',
          value: Math.round(0.8 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'scale',
    statistics: {
      questionId: 'YHsH1aNmj0W',
      title: 'How satisfied are you with our service?',
      data: {
        startLabel: 'Unsatisfied',
        endLabel: 'Very satisfied',
        values: [
          {
            label: '1',
            value: Math.round(0.1 * responseCount),
          },
          {
            label: '2',
            value: Math.round(0.15 * responseCount),
          },
          {
            label: '3',
            value: Math.round(0.2 * responseCount),
          },
          {
            label: '4',
            value: Math.round(0.4 * responseCount),
          },
          {
            label: '5',
            value: Math.round(0.15 * responseCount),
          },
        ],
      },
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: 'qkFCiIcOrbb',
      title: 'Questions and comments',
      data: [
        {
          label: '0 words',
          value: Math.round(0.4 * responseCount),
        },
        {
          label: 'less than 50 words',
          value: Math.round(0.5 * responseCount),
        },
        {
          label: '50 or more words',
          value: Math.round(0.1 * responseCount),
        },
      ],
    },
  },
]

export default statistics
