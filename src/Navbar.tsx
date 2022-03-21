function Navbar() {
  return (
    <nav className="border split-nav">
      <div className="nav-brand">
        <h3>
          <a href="#">Forms</a>
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
              <a href="#">Account</a>
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
