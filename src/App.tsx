import Navbar from './Navbar'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Forms from './Forms'
import Account from './Account'
import FormSettings from './FormSettings'
import {
  FormQuestionsLayout,
  FormQuestionsList,
  FormQuestionsYaml,
} from './FormQuestions'
import {
  FormResponsesLayout,
  FormResponsesStatistics,
  FormResponsesTable,
} from './FormResponses'
import FormNav from './FormNav'
import FormCreate from './FormCreate'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="forms" replace />} />
        <Route path="forms">
          <Route index element={<Forms />} />
          <Route path="new" element={<FormCreate />} />
          <Route path=":formId" element={<FormLayout />}>
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="settings" element={<FormSettings />} />
            <Route path="questions" element={<FormQuestionsLayout />}>
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<FormQuestionsList />} />
              <Route path="yaml" element={<FormQuestionsYaml />} />
            </Route>
            <Route path="responses" element={<FormResponsesLayout />}>
              <Route index element={<Navigate to="table" replace />} />
              <Route path="table" element={<FormResponsesTable />} />
              <Route path="statistics" element={<FormResponsesStatistics />} />
            </Route>
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
