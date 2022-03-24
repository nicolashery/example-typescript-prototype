import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { formsData } from './data'
import { Form, FormId } from './form'

type FormsState = { [key: FormId]: Form }

const initialState: FormsState = formsData

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {},
})

export const selectFormById = (state: RootState, id: FormId): Form => {
  const result = state.forms[id]
  if (!result) {
    throw new Error(`Expected to find form with id ${id}`)
  }
  return result
}

export const selectAllFormsSortByName = (state: RootState): Array<Form> => {
  return Object.values(state.forms).sort((a, b) => a.name.localeCompare(b.name))
}

export const formsReducer = formsSlice.reducer
