import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  EventDetails,
  Group,
  GroupDetails,
  get_event_details,
  get_group_details,
  get_group_list,
} from '../../../../../api/groups'
import { useAlert } from '../../../../../hooks/alert'
import { Route } from '../../../../../routes'
import { LoggedInGuard } from '../../../../../components/LoggedInGuard'
import { Spinner } from '../../../../../components/Spinner'
import { LoggedInPanel } from '../../../../../components/LoggedInPanel'
import { GroupListItemElement } from '../../../components/GroupListItemElement'
import { GroupDetailsBox } from '../../../../../components/GroupDetailsBox'
import { EventDetailsBox } from '../../../../../components/EventDetailsBox'
import { ApiResponse } from '../../../../../api/types'
import { s, str } from '../../../../../helpers/str'

export const EventView = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const { groupId, eventId } = useParams()
  const [{ event, payments, events, group, users }, setDetails] = useState<
    Partial<EventDetails & GroupDetails>
  >({
    event: undefined,
    payments: [],
    events: [],
    group: undefined,
    users: [],
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const alert = useAlert()

  if (!eventId) {
    navigate(Route.groups.list())
  }

  useEffect(() => {
    Promise.all([
      get_group_details(+groupId!),
      get_event_details(+groupId!, +eventId!),
    ])
      .then(
        ([rg, re]) =>
          ({
            ok: rg.ok && re.ok,
            data:
              rg.data === null && re.data === null
                ? null
                : { ...(rg.data ?? {}), ...(re.data ?? {}) },
            error: [re.error, rg.error],
          } as ApiResponse<EventDetails & GroupDetails, (string | null)[]>),
      )
      .then(r =>
        r.ok ? setDetails(r.data) : alert.display(str(r.error), 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [eventId])

  useEffect(() => {
    get_group_list()
      .then(r =>
        r.ok ? setGroups(r.data.groups) : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <div className='main_page_box'>
        <div className='user_info'>
          <div className='user_info--top'>
            <LoggedInPanel
              setLoading={setLoading}
              onLogoutError={e => alert.display(e, 'error')}
            />
          </div>
          <div className='user_info--bottom'>
            <div className='group_list_box'>
              <h2 style={{ color: '#073B78', fontFamily: 'Libre Bodoni' }}>
                groups
              </h2>
              <ul className='group_list'>
                {groups.map((group, i) => (
                  <GroupListItemElement {...group} key={i} />
                ))}
              </ul>
            </div>
            <div>
              <button
                className='groups_button'
                onClick={() => navigate(Route.groups.create())}
              >
                add
              </button>
            </div>
          </div>
        </div>
        <EventDetailsBox
          event={event!}
          payments={payments}
          events={events!}
          group={group!}
          users={users!}
        />
      </div>
    </>
  )
}
