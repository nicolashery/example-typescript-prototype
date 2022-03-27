import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { formsData } from './data'
import { Form, FormId, generateFormId } from './form'

type FormsState = { [key: FormId]: Form }

const initialState: FormsState = formsData

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    formAdded: {
      reducer: (state, action: PayloadAction<Form>) => {
        const form = action.payload
        state[form.id] = form
      },
      prepare: (name: string) => {
        const form: Form = {
          id: generateFormId(),
          name: name,
          published: false,
        }
        return {
          payload: form,
        }
      },
    },

    formSettingsUpdated: {
      reducer: (state, action: PayloadAction<Form>) => {
        const form = action.payload
        state[form.id] = form
      },
      prepare: (id: FormId, name: string, published: boolean) => {
        const form: Form = {
          id: id,
          name: name,
          published: published,
        }
        return {
          payload: form,
        }
      },
    },
  },
})

export const { formAdded, formSettingsUpdated } = formsSlice.actions

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
