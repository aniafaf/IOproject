import { User } from '../../../../api/users'

export interface UserPanelProps {
  users: User[]
  groupId: number
}
export const UserPanel = ({ users }: UserPanelProps) => (
  <>
    [PH] <br />
    <ol className='list'>
      {users.map((user, i) => (
        <li key={i} className='list__item'>
          {user.first_name} {user.last_name}
        </li>
      ))}
    </ol>
  </>
)
