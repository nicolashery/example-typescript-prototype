import Navbar from './Navbar'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Forms from './Forms'
import Account from './Account'
import FormSettings from './FormSettings'
import FormQuestions from './FormQuestions'
import FormResponses from './FormResponses'
import FormNav from './FormNav'
import FormNew from './FormNew'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="forms" replace />} />
        <Route path="forms">
          <Route index element={<Forms />} />
          <Route path="new" element={<FormNew />} />
          <Route path=":formId" element={<FormLayout />}>
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="settings" element={<FormSettings />} />
            <Route path="questions" element={<FormQuestions />} />
            <Route path="responses" element={<FormResponses />} />
          </Route>
        </Route>
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container margin-top-large margin-bottom-large">
        <Outlet />
      </div>
    </>
  )
}

function FormLayout() {
  return (
    <>
      <FormNav />
      <div className="margin-top-large margin-bottom-large">
        <Outlet />
      </div>
    </>
  )
}

export default App
