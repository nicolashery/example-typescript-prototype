import { NavLink, useParams } from 'react-router-dom'
import { FormId } from './form'
import { selectFormById } from './formsSlice'
import { useAppSelector } from './hooks'

type Params = {
  formId: FormId
}

function FormNav() {
  const params = useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  return (
    <>
      <h3 className="row flex-center margin-none">{form.name}</h3>
      <nav className="subnav row flex-center margin-top-small">
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
