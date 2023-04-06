export const get_uid = (): Promise<string> => {
  const match = /uid=([^&#/]+)/i.exec(location.href)
  if (!match || match.length < 2) {
    return Promise.reject(`UID not found in the url.`)
  }
  return Promise.resolve(match[1])
}

export const get_token = (): Promise<string> => {
  const match = /token=([^&#/]+)/i.exec(location.href)
  if (!match || match.length < 2) {
    return Promise.reject(`token not found in the url.`)
  }
  return Promise.resolve(match[1])
}
