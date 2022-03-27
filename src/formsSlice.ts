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
      reducer: (state, action: PayloadAction<{ id: FormId; name: string }>) => {
        const { id, name } = action.payload
        const form: Form = {
          id: id,
          name: name,
          published: false,
          questions: [],
        }
        state[id] = form
      },
      prepare: (name: string) => {
        return {
          payload: {
            id: generateFormId(),
            name: name,
          },
        }
      },
    },

    formSettingsUpdated: (
      state,
      action: PayloadAction<{ id: FormId; name: string; published: boolean }>
    ) => {
      const { id, name, published } = action.payload
      state[id].name = name
      state[id].published = published
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
