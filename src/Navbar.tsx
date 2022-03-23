import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="border split-nav">
      <div className="nav-brand">
        <h3>
          <Link to="/">Forms</Link>
        </h3>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <label htmlFor="collapsible1">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </label>
        <div className="collapsible-body">
          <ul className="inline">
            <li>
              <NavLink to="forms">Forms</NavLink>
            </li>
            <li>
              <NavLink to="account">Account</NavLink>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
