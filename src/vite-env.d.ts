/// <reference types="vite/client" />

// Other file types that TypeScript can't resolve module for
declare module '*.yaml' {
  const data: any
  export default data
}

declare module '*.csv' {
  const data: any
  export default data
}

// Libraries with no type definitions
declare module 'chart.xkcd'
declare module 'js-yaml'
declare module 'prismjs/components/prism-yaml'
declare module 'prismjs/components/prism-csv'
