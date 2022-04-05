import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formAdded } from './formsSlice'
import { useAppDispatch } from './hooks'

function FormCreate() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value)

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    if (name.trim().length === 0) {
      return
    }

    const action = formAdded(name)
    dispatch(action)
    navigate(`/forms/${action.payload.id}`)
  }

  return (
    <>
      <h3>New form</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <input type="submit" className="paper-btn btn-primary" value="Create" />
      </form>
      <p>
        <Link to="/forms">Back to forms</Link>
      </p>
    </>
  )
}

export default FormCreate
