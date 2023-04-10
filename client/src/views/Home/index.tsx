import { Link } from 'react-router-dom'
import { LoggedInGuard } from '../../components/LoggedInGuard'
import { Route } from '../../routes'

export const HomeView = () => (
  <>
    <LoggedInGuard />
    <h1>[PH] home</h1>
    <Link to={Route.groups.list()}>List</Link>
  </>
)
