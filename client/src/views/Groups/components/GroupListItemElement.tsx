import { Link, NavLink } from 'react-router-dom'
import { Group } from '../../../api/groups'
import { Route } from '../../../routes'
import './index.css'

export const GroupListItemElement = ({ name, id }: Group) => (
  <li className='group-item'>
    <NavLink to={Route.groups.byId(id)} className='group_nav_button group-item__link'>
      {name}
    </NavLink>
  </li>
)
