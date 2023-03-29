export const isLoggedIn = () => {
  return !!document.cookie
      .split(/\s*;\s*/)
      .filter(s => s.startsWith('sessionid'))
      .map(s => s.split('='))
      .reduce((u, s) => u || s[1], '')
}
