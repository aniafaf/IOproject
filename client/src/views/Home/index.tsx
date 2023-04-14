import { Link } from 'react-router-dom'
import { LoggedInGuard } from '../../components/LoggedInGuard'
import { LoggedInPanel } from '../../components/LoggedInPanel'
import { Route } from '../../routes'
import { FormLink } from '../../components/FormLink'
import { Spinner } from '../../components/Spinner'
import { useState } from 'react'
import { useAlert } from '../../hooks/alert'

export const HomeView = () => {
  const [loading, setLoading] = useState(false)
  const alert = useAlert()

  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <div className='main_page_box'>
        <div className='user_info'>
          <div className='user_info--top'>
            <LoggedInPanel
              setLoading={setLoading}
              onLogoutError={e => alert.display(e, 'error')}
            />
          </div>
          <div className='user_info--bottom'>
            <div>
              <FormLink to={Route.groups.list()}>go to group view</FormLink>
            </div>
          </div>
        </div>
        <div className='viewDetailsPlaceholder'></div>
      </div>
    </>
  )
}
