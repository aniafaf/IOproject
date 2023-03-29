import { Navigate } from 'react-router'
import { isLoggedIn } from '../hooks/isLoggedIn'
import { Route } from '../routes'

export const LoggedInGuard = () =>
  isLoggedIn() ? <></> : <Navigate to={Route.login()} />

export const NotLoggedInGuard = () =>
  !isLoggedIn() ? <></> : <Navigate to={Route.home()} />
