/// <reference types="vite/client" />

// Other file types that TypeScript can't resolve module for
declare module '*.yaml' {
  const data: any
  export default data
}
