import { useEffect, useRef } from 'react'
import chartXkcd from 'chart.xkcd'

export function BarChart(props: { config: any }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (ref.current) {
      new chartXkcd.Bar(ref.current, props.config)
    }
  })

  return <svg ref={ref} />
}

export function PieChart(props: { config: any }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (ref.current) {
      new chartXkcd.Pie(ref.current, props.config)
    }
  })

  return <svg ref={ref} />
}
