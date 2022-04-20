import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-csv'

export default function Code(props: { code: string; language: string }) {
  const { code, language } = props

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
