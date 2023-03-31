export const get_uid = (): Promise<string> => {
  const match = /uid=(\w+)/i.exec(location.href)
  if (!match || match.length < 2) {
    return Promise.reject(`UID not found in the url.`)
  }
  return Promise.resolve(match[1])
}
