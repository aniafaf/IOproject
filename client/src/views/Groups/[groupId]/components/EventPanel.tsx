import { Event } from '../../../../api/groups'
import { EventItemElement } from './EventItemElement'

export interface EventPanelProps {
  events: Event[]
  groupId: number
}

export const EventPanel = ({ events }: EventPanelProps) => (
  <>
    [PH] <br />
    <ol className='list'>
      {events.map((event, i) => (
        <EventItemElement {...event} key={i} />
      ))}
    </ol>
  </>
)
