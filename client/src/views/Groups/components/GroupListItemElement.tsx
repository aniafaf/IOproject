import { Link } from 'react-router-dom'
import { GroupListItem } from '../../../api/groups'
import { Route } from '../../../routes'

export const GroupListItemElement = ({ name, id }: GroupListItem) => (
  <li className='group-item'>
    <Link className='group-item__link' to={Route.group(id)}>
      {name}
    </Link>
  </li>
)
