import { NavLink, useParams } from 'react-router-dom'
import { formsData } from './data'
import { FormId } from './form'

type Params = {
  formId: FormId
}

function FormNav() {
  const params = useParams() as Params
  const form = formsData[params.formId]

  return (
    <>
      <h3 className="row flex-center margin-none">{form.name}</h3>
      <nav className="row flex-center">
        <ul className="inline">
          <li>
            <NavLink to="settings">Settings</NavLink>
          </li>
          <li>
            <NavLink to="questions">Questions</NavLink>
          </li>
          <li>
            <NavLink to="responses">Responses</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default FormNav
