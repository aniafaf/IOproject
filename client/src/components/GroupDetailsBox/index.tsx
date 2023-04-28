import { useNavigate, useParams } from 'react-router'
import { Route } from '../../routes'
import './index.css'
import { useEffect, useState } from 'react'
import { Event, Group, GroupDetails, get_group_list } from '../../api/groups'
import { useAlert } from '../../hooks/alert'
import { User } from '../../api/users'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useInvLink } from '../../hooks/use_inv_link'
import { Link } from 'react-router-dom'

export const GroupDetailsBox = ({
  users,
  events,
  group,
}: Partial<GroupDetails>) => {
  const [groups, setGroups] = useState<Group[]>([])
  const navigate = useNavigate()
  const alert = useAlert()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const invLink = useInvLink(group)

  useEffect(() => {
    get_group_list()
      .then(r =>
        r.ok ? setGroups(r.data.groups) : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)

  if (!group) {
    return <></>
  }

  return (
    <>
      <div className='group_details_box'>
        <div className='events_box'>
          <div className='events_list_box'>
            <h1 style={{ color: '#FEFEFE', fontFamily: 'Libre Bodoni' }}>
              events
            </h1>
            <ul className='event_list' style={{ color: '#073B78' }}>
              {events?.map(e => (
                <li key={e.id} className='event_element'>
                  {e.name}
                </li>
              ))}
            </ul>

            <div style={{ position: 'absolute', right: 20, top: 20 }}>
              <Link
                className='events_button'
                to={Route.groups.events(group.id).add()}
              >
                +
              </Link>
            </div>
          </div>
        </div>
        <div className='members_box'>
          <div className='members_list_box'>
            <h2 style={{ color: '#073B78', fontFamily: 'Libre Bodoni' }}>
              members
            </h2>
            <ul className='members_list'>
              {users?.map(
                ({ username, first_name: name, last_name: surname }, i) => (
                  console.dir({ name, surname }),
                  (
                    <li className='user_element' key={i}>
                      {name} {surname} ({username})
                    </li>
                  )
                ),
              )}
            </ul>
          </div>
          <div>
            <button className='groups_button' onClick={handleDialogOpen}>
              invite
            </button>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Invitation link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Link to={invLink}>{invLink}</Link>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                invLink,
              )}`}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
