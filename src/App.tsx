import Navbar from './Navbar'
import FormList from './FormList'

import { formsData } from './data'

function App() {
  const forms = Object.values(formsData).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return (
    <>
      <Navbar />
      <div className="container margin-top-large">
        {forms.length === 0 ? (
          <p>You don't have any forms created yet.</p>
        ) : null}
        <p>
          <a href="#" className="paper-btn btn-primary">
            Create a new form
          </a>
        </p>
        {forms.length > 0 ? <FormList forms={forms} /> : null}
      </div>
    </>
  )
}

export default App
