import { FormId, Form } from './form'
import { User } from './user'

import orderRequest from './data/order-request.yaml'
import timeOffRequest from './data/time-off-request.yaml'

import user from './data/user.yaml'

export const formsData: { [key: FormId]: Form } = {
  [orderRequest.id]: orderRequest,
  [timeOffRequest.id]: timeOffRequest,
}

export const userData: User = user
