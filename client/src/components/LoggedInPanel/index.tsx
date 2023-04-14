import './index.css'
import { Route } from '../../routes'
import { FormLink } from '../FormLink'

const handleLogOut = () => {
  // TODO
}

export const LoggedInPanel = () => (
  <>
    <div className='log_out_button'>
      <FormLink to={Route.login() }>log out</FormLink>
    </div>
    <div className='user_profile'>
      <div className='user_photo' />
      <h1 style={{ color: '#3F3F3F', fontFamily: 'Libre Bodoni', marginTop: 0}}>username</h1>
    </div>
  </>
)
