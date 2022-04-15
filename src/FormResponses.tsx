import { NavLink, Outlet, useParams } from 'react-router-dom'
import { FormId } from './form'
import { useAppSelector } from './hooks'
import { selectFormResponses } from './responsesSlice'

type Params = {
  formId: FormId
}

export function FormResponsesLayout() {
  const params = useParams() as Params
  const { responses } = useAppSelector((state) =>
    selectFormResponses(state, params.formId)
  )

  if (responses.length === 0) {
    return (
      <>
        <p>There are no responses yet.</p>
      </>
    )
  }

  return (
    <>
      <FormResponsesNav responseCount={responses.length} />
      <Outlet />
    </>
  )
}

function FormResponsesNav(props: { responseCount: number }) {
  return (
    <nav className="subnav row flex-edges flex-middle">
      <div>
        Responses: <strong>{props.responseCount}</strong>
      </div>
      <ul className="inline">
        <li>
          <NavLink to="table">Table</NavLink>
        </li>
        <li>
          <NavLink to="statistics">Statistics</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export function FormResponsesTable() {
  const params = useParams() as Params
  const { header, responses } = useAppSelector((state) =>
    selectFormResponses(state, params.formId)
  )

  return (
    <div className="table-container-scroll">
      <table className="table-scroll">
        <thead>
          <tr>
            {header.map((name, index) => (
              <th key={index} title={name}>
                {index === 0 ? '#' : name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((row, index) => (
            <tr key={index}>
              {row.map((response, index) => (
                <td title={response} key={index}>
                  {response}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FormResponsesStatistics() {
  return <p>Statistics</p>
}
