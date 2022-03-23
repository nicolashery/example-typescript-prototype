import { formsData } from './data'
import FormList from './FormList'

function Forms() {
  const forms = Object.values(formsData).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

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
