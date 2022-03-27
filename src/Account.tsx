import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { User } from './user'
import { accountUpdated, selectUser } from './userSlice'

function Account() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const [name, setName] = useState(user.name)
  const onNameChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value)

  const [email, setEmail] = useState(user.email)
  const onEmailChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value)

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    if (name.trim().length === 0) {
      return
    }

    const user: User = {
      name: name,
      email: email,
    }
    const action = accountUpdated(user)
    dispatch(action)
  }

  return (
    <>
      <h3>Account</h3>
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChanged}
          />
        </div>
        <input type="submit" className="paper-btn btn-primary" value="Save" />
      </form>
    </>
  )
}

export default Account
function dispatch(action: any) {
  throw new Error('Function not implemented.')
}
