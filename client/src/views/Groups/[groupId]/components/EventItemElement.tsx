import { Link } from 'react-router-dom'
import { Event } from '../../../../api/groups'

export const EventItemElement = ({ name, id }: Event) => (
  <li className='event'>
    <Link to={'.'}>
      {name} ({id})
    </Link>
  </li>
)
