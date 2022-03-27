import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormId } from './form'
import { formSettingsUpdated, selectFormById } from './formsSlice'
import { useAppDispatch, useAppSelector } from './hooks'

type Params = {
  formId: FormId
}

function FormSettings() {
  const params = useParams() as Params
  const dispatch = useAppDispatch()
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  const [name, setName] = useState(form.name)
  const onNameChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value)

  const [published, setPublished] = useState(form.published)
  const onPublishedChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPublished(e.target.checked)

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    if (name.trim().length === 0) {
      return
    }

    const action = formSettingsUpdated({
      id: form.id,
      name: name,
      published: published,
    })
    dispatch(action)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onNameChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="published" className="paper-check">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={published}
              onChange={onPublishedChanged}
            />{' '}
            <span>Published</span>
            <div className="text-small text-muted margin-top-small">
              Only published forms will accept responses.
            </div>
          </label>
        </div>
        <input type="submit" className="paper-btn btn-primary" value="Save" />
      </form>
    </>
  )
}

export default FormSettings
