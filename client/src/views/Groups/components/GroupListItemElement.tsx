import { Link, NavLink } from 'react-router-dom'
import { Group } from '../../../api/groups'
import { Route } from '../../../routes'

export const GroupListItemElement = ({ name, id }: Group) => (
  <li className='group-item'>
    <NavLink className='group-item__link' to={Route.groups.byId(id)}>
      {name}
    </NavLink>
  </li>
)
