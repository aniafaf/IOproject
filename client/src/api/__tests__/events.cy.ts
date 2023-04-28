import { EventAddForm, post_event_add } from '../events'
import { Group, get_group_details } from '../groups'
import { post_group_create } from '../groups'
import { AuxProps, mkUserHelper } from '../test/user_helpers'

describe('events', () => {
  const group_name = 'WHGS group :)'
  const event_form: EventAddForm = {
    name: 'Jojo Siwa’s Phone Catastrophe',
    location: 'Somewhere in NYC',
  }
  let mockUser: AuxProps & { data: Group | null }

  before(async () => {
    mockUser = await mkUserHelper(
      {
        username: 'agavin',
        password: 'toor1234',
      },
      async ({ login, free_register }) => {
        await free_register()
        await login()
        const d = await post_group_create({
          name: group_name,
        })

        return d.data
      },
    )
  })

  beforeEach(async () => {
    await mockUser.login()
  })

  it('creates an event', () =>
    post_event_add(mockUser.data?.id!, event_form)
      .then(
        r => (
          expect(r.ok, r.error!).to.be.true, expect(r.data, r.error!).to.be.true
        ),
      )
      .then(() => get_group_details(mockUser.data?.id!))
      .then(r =>
        expect(r.data?.events.map(e => e.name)).to.contain(event_form.name),
      ))
})
