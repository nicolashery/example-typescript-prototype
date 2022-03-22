import { FormId, Form } from './form'

import orderRequest from './data/order-request.yaml'
import timeOffRequest from './data/time-off-request.yaml'

export const formsData: { [key: FormId]: Form } = {
  [orderRequest.id]: orderRequest,
  [timeOffRequest.id]: timeOffRequest,
}
