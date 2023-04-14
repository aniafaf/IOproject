export const get_query = (key: string): Promise<string> => {
  const match = new RegExp(`${key}=([^&#/]+)`, 'i').exec(location.href)
  if (!match || match.length < 2) {
    return Promise.reject(`${key} not found in the url.`)
  }
  return Promise.resolve(match[1])
}
