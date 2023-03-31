import { describe, it, expect } from 'vitest'
import { API_URL } from '../constants'

describe('api constants', () => {
  it('sets API_URL', () => expect(API_URL).toBe('http://0.0.0.0:8000/api'))
})
