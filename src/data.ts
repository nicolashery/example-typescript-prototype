import { FormId, Form } from './form'
import { User } from './user'

import customerFeedback from './data/customer-feedback.yaml'
import customerFeedbackResponses from './data/customer-feedback-responses.csv'
import customerFeedbackStatistics from './data/customer-feedback-statistics'
import orderRequest from './data/order-request.yaml'
import orderRequestResponses from './data/order-request-responses.csv'
import orderRequestStatistics from './data/order-request-statistics'
import timeOffRequest from './data/time-off-request.yaml'

import user from './data/user.yaml'
import { QuestionStatistics } from './statistics'

export const formsData: { [key: FormId]: Form } = {
  [customerFeedback.id]: customerFeedback,
  [orderRequest.id]: orderRequest,
  [timeOffRequest.id]: timeOffRequest,
}

export const userData: User = user

export const responsesData: { [key: FormId]: Array<Array<string>> } = {
  [customerFeedback.id]: customerFeedbackResponses,
  [orderRequest.id]: orderRequestResponses,
  [timeOffRequest.id]: [],
}

export const statisticsData: { [key: FormId]: Array<QuestionStatistics> } = {
  [customerFeedback.id]: customerFeedbackStatistics,
  [orderRequest.id]: orderRequestStatistics,
  [timeOffRequest.id]: [],
}
