import { Link } from 'react-router-dom'
import { GroupListItem } from '../../../api/groups'

export const GroupListItemElement = ({ name, id }: GroupListItem) => (
  <li className='group-item'>
    <Link className='group-item__link' to={`./${id}`}>
      {name}
    </Link>
  </li>
)
