import { Link } from 'react-router-dom'
import { Form } from './form'

function FormList(props: { forms: Array<Form> }) {
  return (
    <>
      {props.forms.map((form) => (
        <p key={form.id}>
          <Link to={form.id}>{form.name}</Link>
        </p>
      ))}
    </>
  )
}

export default FormList
