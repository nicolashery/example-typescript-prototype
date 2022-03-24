import FormList from './FormList'
import { selectAllFormsSortByName } from './formsSlice'
import { useAppSelector } from './hooks'

function Forms() {
  const forms = useAppSelector(selectAllFormsSortByName)

  return (
    <>
      {forms.length === 0 ? <p>You don't have any forms created yet.</p> : null}
      <p>
        <a href="#" className="paper-btn btn-primary">
          Create a new form
        </a>
      </p>
      {forms.length > 0 ? <FormList forms={forms} /> : null}
    </>
  )
}

export default Forms
