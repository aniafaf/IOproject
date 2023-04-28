import './index.css'
import { Route } from '../../routes'
import { FormLink } from '../FormLink'
import { useNavigate } from 'react-router'
import { post_logout } from '../../api/post_logout'
import userPhotoUrl from './assets/user_photo.png'
import { useEffect, useState } from 'react'
import { fetch_api } from '../../api/call'
import { useAlert } from '../../hooks/alert'

export interface LoggedInPanelProps {
  setLoading: (b: boolean) => void
  onLogoutError: (e: any) => void
}

export const LoggedInPanel = ({
  setLoading,
  onLogoutError,
}: LoggedInPanelProps) => {
  const navigate = useNavigate()
  const alert = useAlert()
  const handleLogOut = () => {
    setLoading(true)
    post_logout()
      .then(r => (r.ok ? navigate(Route.login()) : onLogoutError(r.error)))
      .catch(onLogoutError)
      .finally(() => setLoading(false))
  }
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch_api<{ username: string }>({
      path: 'whoami/',
    })
      .then(
        r => (
          console.dir(r),
          r.ok
            ? setDisplayName(r.data.username)
            : alert.display(r.error, 'error')
        ),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <alert.AlertComponent />
      <div className='log_out_button'>
        <button onClick={handleLogOut}>log out</button>
      </div>
      <div className='user_profile'>
        <div
          className='user_photo'
          style={{ '--img-url': userPhotoUrl } as any}
        />
        <h1
          style={{ color: '#3F3F3F', fontFamily: 'Libre Bodoni', marginTop: 0 }}
        >
          {displayName}
        </h1>
      </div>
    </>
  )
}
