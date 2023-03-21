/// <reference types="vite/client" />

declare interface ImportedMetaEnv {
  readonly VITE_ASSETS_BASE: string
  readonly VITE_API_BASE: string
}

interface ImportMetaEnv extends ImportedMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
