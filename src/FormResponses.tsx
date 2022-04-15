import { useParams } from 'react-router-dom'
import { FormId } from './form'
import { useAppSelector } from './hooks'
import { selectFormResponses } from './responsesSlice'

type Params = {
  formId: FormId
}

function FormResponses() {
  const params = useParams() as Params
  const { header, responses } = useAppSelector((state) =>
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
      <p>
        Responses: <strong>{responses.length}</strong>
      </p>
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
    </>
  )
}

export default FormResponses
