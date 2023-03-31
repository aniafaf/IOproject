export const API_URL = (() => {
  const base = import.meta.env.VITE_API_BASE
  return base.startsWith('http') ? base : `http://${base}`
})()
