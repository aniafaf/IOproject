import { useEffect } from 'react'

export const useLoggedIn = () => {
  let loggedIn = false

  useEffect(() => {
    loggedIn = !!document.cookie
      .split(/\s*;\s*/)
      .filter(s => s.startsWith('SESSION_KEY'))
      .map(s => s.split('='))
      .reduce((u, s) => u || s[1], '')
  }, [document.cookie])

  return loggedIn
}
