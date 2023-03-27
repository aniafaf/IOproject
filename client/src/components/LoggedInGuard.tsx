import { Navigate } from 'react-router'
import { useLoggedIn } from '../hooks/useLoggedIn'
import { Route } from '../routes'

export const LoggedInGuard = () =>
  useLoggedIn() ? <></> : <Navigate to={Route.login()} />

export const NotLoggedInGuard = () =>
  !useLoggedIn() ? <></> : <Navigate to={Route.home()} />
