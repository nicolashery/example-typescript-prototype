import { Form } from './form'

type FormListProps = {
  forms: Array<Form>
}

function FormList(props: FormListProps) {
  return (
    <>
      {props.forms.map((form) => (
        <p>
          <a href={`#${form.id}`}>{form.name}</a>
        </p>
      ))}
    </>
  )
}

export default FormList
