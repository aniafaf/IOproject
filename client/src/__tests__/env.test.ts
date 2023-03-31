import { describe, it, expect } from 'vitest'

describe('env', () => {
  const expected_env: ImportedMetaEnv = {
    VITE_API_BASE: 'http://0.0.0.0:8000/api',
    VITE_ASSETS_BASE: '/',
  }

  Object.entries(expected_env).forEach(([k, v]) =>
    it(`sets ${k}`, () =>
      expect({ [k]: import.meta.env[k] }).toStrictEqual({ [k]: v })),
  )
})
