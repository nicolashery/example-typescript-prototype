import { QuestionStatistics } from '../statistics'

const responseCount = 132

const statistics: Array<QuestionStatistics> = [
  {
    tag: 'bar',
    statistics: {
      questionId: 'Rq5HRcqjiFr',
      title: 'Feedback type',
      data: [
        {
          label: 'Comments',
          value: Math.round(0.18 * responseCount),
        },
        {
          label: 'Questions',
          value: Math.round(0.09 * responseCount),
        },
        {
          label: 'Bug Report',
          value: Math.round(0.46 * responseCount),
        },
        {
          label: 'Feature Request',
          value: Math.round(0.27 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: 'BSNBAUariQf',
      title: 'Feedback',
      data: [
        {
          label: '0 words',
          value: 0,
        },
        {
          label: 'less than 50 words',
          value: Math.round(0.74 * responseCount),
        },
        {
          label: '50 or more words',
          value: Math.round(0.26 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: 'LUgOnGflfjW',
      title: 'Suggestions for improvement',
      data: [
        {
          label: '0 words',
          value: Math.round(0.54 * responseCount),
        },
        {
          label: 'less than 50 words',
          value: Math.round(0.35 * responseCount),
        },
        {
          label: '50 or more words',
          value: Math.round(0.11 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'bar',
    statistics: {
      questionId: 'EaVgPo51PDe',
      title: 'Product(s) used',
      data: [
        {
          label: 'Invoicing',
          value: Math.round(0.55 * responseCount),
        },
        {
          label: 'Customer Management',
          value: Math.round(0.3 * responseCount),
        },
        {
          label: 'Accounting',
          value: Math.round(0.45 * responseCount),
        },
        {
          label: 'Inventory Management',
          value: Math.round(0.35 * responseCount),
        },
        {
          label: 'Employee Management',
          value: Math.round(0.2 * responseCount),
        },
        {
          label: '(No response)',
          value: Math.round(0.1 * responseCount),
        },
      ],
    },
  },
  {
    tag: 'scale',
    statistics: {
      questionId: 'HAR7cDvgDqf',
      title: 'How likely are you to recommend us to a friend or colleague?',
      data: {
        startLabel: '',
        endLabel: '',
        values: [
          {
            label: '0',
            value: Math.round(0.03 * responseCount),
          },
          {
            label: '1',
            value: Math.round(0.02 * responseCount),
          },
          {
            label: '2',
            value: Math.round(0.04 * responseCount),
          },
          {
            label: '3',
            value: Math.round(0.05 * responseCount),
          },
          {
            label: '4',
            value: Math.round(0.04 * responseCount),
          },
          {
            label: '5',
            value: Math.round(0.11 * responseCount),
          },
          {
            label: '6',
            value: Math.round(0.08 * responseCount),
          },
          {
            label: '7',
            value: Math.round(0.19 * responseCount),
          },
          {
            label: '8',
            value: Math.round(0.28 * responseCount),
          },
          {
            label: '9',
            value: Math.round(0.09 * responseCount),
          },
          {
            label: '10',
            value: Math.round(0.07 * responseCount),
          },
        ],
      },
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: 'SsMALDiMwfF',
      title: 'Name',
      data: [
        {
          label: '0 words',
          value: Math.round(0.37 * responseCount),
        },
        {
          label: 'less than 10 words',
          value: Math.round(0.63 * responseCount),
        },
        {
          label: '10 or more words',
          value: 0,
        },
      ],
    },
  },
  {
    tag: 'pie',
    statistics: {
      questionId: 'mP5eQz5WQus',
      title: 'Email',
      data: [
        {
          label: '0 words',
          value: Math.round(0.32 * responseCount),
        },
        {
          label: 'less than 10 words',
          value: Math.round(0.68 * responseCount),
        },
        {
          label: '10 or more words',
          value: 0,
        },
      ],
    },
  },
]

export default statistics
