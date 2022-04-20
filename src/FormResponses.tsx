import { NavLink, Outlet, useParams } from 'react-router-dom'
import chartXkcd from 'chart.xkcd'
import { stringify } from 'csv-stringify/browser/esm/sync'
import { FormId } from './form'
import { useAppSelector } from './hooks'
import { selectFormResponses } from './responsesSlice'
import { BarChart, PieChart } from './chart'
import { QuestionStatistics } from './statistics'
import Code from './Code'

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
        <li>
          <NavLink to="csv">CSV</NavLink>
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
  const params = useParams() as Params
  const { statistics } = useAppSelector((state) =>
    selectFormResponses(state, params.formId)
  )

  const renderQuestionStatistics = (item: QuestionStatistics): JSX.Element => {
    switch (item.tag) {
      case 'bar':
        return (
          <BarChart
            config={{
              title: item.statistics.title,
              data: {
                labels: item.statistics.data.map((x) => x.label),
                datasets: [
                  {
                    data: item.statistics.data.map((x) => x.value),
                  },
                ],
              },
              options: {
                yTickCount: 4,
              },
            }}
          />
        )
      case 'pie':
        return (
          <PieChart
            config={{
              title: item.statistics.title,
              data: {
                labels: item.statistics.data.map((x) => x.label),
                datasets: [
                  {
                    data: item.statistics.data.map((x) => x.value),
                  },
                ],
              },
              options: {
                legendPosition: chartXkcd.config.positionType.upRight,
              },
            }}
          />
        )
      case 'scale':
        return (
          <BarChart
            config={{
              title: item.statistics.title,
              data: {
                labels: item.statistics.data.values.map((x, index) => {
                  if (index === 0) {
                    return `${x.label} (${item.statistics.data.startLabel})`
                  }
                  if (index === item.statistics.data.values.length - 1) {
                    return `${x.label} (${item.statistics.data.endLabel})`
                  }
                  return x.label
                }),
                datasets: [
                  {
                    data: item.statistics.data.values.map((x) => x.value),
                  },
                ],
              },
              options: {
                yTickCount: 4,
                dataColors: item.statistics.data.values.map(() => '#28a3dd'),
              },
            }}
          />
        )
    }
  }

  return (
    <>
      {statistics.map((item) => (
        <div key={item.statistics.questionId} className="chart margin-bottom">
          {renderQuestionStatistics(item)}
        </div>
      ))}
    </>
  )
}

export function FormResponsesCsv() {
  const params = useParams() as Params
  const { header, responses } = useAppSelector((state) =>
    selectFormResponses(state, params.formId)
  )

  return <Code language="csv" code={stringify([header].concat(responses))} />
}
