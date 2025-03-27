/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions

  export default componentOptions
}
