import './index.css'
import { Route } from '../../routes'
import { FormLink } from '../FormLink'
import { useNavigate } from 'react-router'
import { post_logout } from '../../api/post_logout'
import userPhotoUrl from './assets/user_photo.png'

export interface LoggedInPanelProps {
  setLoading: (b: boolean) => void
  onLogoutError: (e: any) => void
}

export const LoggedInPanel = ({
  setLoading,
  onLogoutError,
}: LoggedInPanelProps) => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    setLoading(true)
    post_logout()
      .then(r => (r.ok ? navigate(Route.login()) : onLogoutError(r.error)))
      .catch(onLogoutError)
      .finally(() => setLoading(false))
  }

  return (
    <>
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
          username
        </h1>
      </div>
    </>
  )
}
