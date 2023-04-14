import { useHref } from 'react-router'
import { Group } from '../api/groups'
import { Route } from '../routes'

export const useInvLink = (group?: Group): string => {
  const invitationBase = useHref(Route.groups.join(group?.id!))
  return `${location.origin}/${invitationBase}/?hash=${
    group?.hash
  }&name=${encodeURIComponent(group?.name ?? '')}`
}
