import { createSlice } from '@reduxjs/toolkit'
import { FormId } from './form'
import { responsesData, statisticsData } from './data'
import { RootState } from './store'
import { QuestionStatistics } from './statistics'

type ResponsesState = { [key: FormId]: FormResponses }

export type FormResponses = {
  header: Array<string>
  responses: Array<Array<string>>
  statistics: Array<QuestionStatistics>
}

const initialState: ResponsesState = Object.fromEntries(
  Object.entries(responsesData).map(([key, rows]) => [
    key,
    {
      // First row contains header
      header: rows.length > 0 ? rows[0] : [],
      responses: rows.slice(1),
      statistics: statisticsData[key],
    },
  ])
)

export const reponsesSlice = createSlice({
  name: 'responses',
  initialState,
  reducers: {},
})

export const selectFormResponses = (
  state: RootState,
  id: FormId
): FormResponses => {
  const result = state.responses[id]
  if (!result) {
    throw new Error(`Expected to find responses for form with id ${id}`)
  }
  return result
}

export const responsesReducer = reponsesSlice.reducer
