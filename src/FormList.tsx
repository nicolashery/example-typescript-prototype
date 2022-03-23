import { Link } from 'react-router-dom'
import { Form } from './form'

type FormListProps = {
  forms: Array<Form>
}

function FormList(props: FormListProps) {
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
