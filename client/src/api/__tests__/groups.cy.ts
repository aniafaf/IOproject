import {
  Group,
  get_group_details,
  get_group_list,
  post_group_create,
  post_group_join,
} from '../groups'
import { post_login } from '../post_login'
import { s, str } from '../../helpers/str'
import { post_register } from '../post_register'
import { delete_groups } from '../test/delete_groups'
import { delete_users } from '../test/delete_users'
import { post_logout } from '../post_logout'

const username = 'dabutch'
const password = 'toor1234'
const makeMockUser = () =>
  delete_users().then(() =>
    post_register('Ashley', 'Gavin', username, 'agavin@gmail.com', password),
  )
const loginMockUser = () => post_login(username, password)

describe('group create', () => {
  before(makeMockUser)
  beforeEach(async () => {
    await delete_groups()
    await loginMockUser()
  })

  it('creates a group', () => {
    const groupName = 'A test group!'
    return post_group_create({
      name: groupName,
    })
      .then(r => {
        expect(r.ok, str(r.error)).to.be.true
        return expect(r.data?.name).to.eq(groupName)
      })
      .catch(e => expect(e, str(e)).to.be.undefined)
  })
})

describe('group list', () => {
  before(async () => {
    await makeMockUser()
    await loginMockUser()
    await delete_groups()
  })

  it('empty when not in any group', () =>
    get_group_list()
      .then(r => {
        expect(r.ok, str(r.error)).to.be.true
        return expect(r.data).to.deep.eq({ groups: [] })
      })
      .catch(e => expect(e, str(e)).to.be.undefined))

  it('contains created group', () => {
    const group_name = 'Mortgage:)'
    post_group_create({
      name: group_name,
    })
      .then(r => expect(r.ok, str(r.error)).to.be.true)
      .then(() => get_group_list())
      .then(r => {
        expect(r.ok, str(r.error)).to.be.true
        expect(r.data?.groups).to.have.lengthOf(1)
        expect(r.data?.groups?.[0]?.name).to.be(group_name)
      })
  })
})

describe('group details', () => {
  const group_name = 'Mortgage:)'
  let group: Group

  before(async () => {
    await makeMockUser()
    await loginMockUser()
    await post_group_create({ name: group_name }).then(r => (group = r.data!))
  })

  beforeEach(async () => {
    await loginMockUser()
  })

  it('matches created group details', () =>
    get_group_details(group?.id)
      .then(r => {
        expect(r.ok).to.be.true
        return expect(
          r.data?.group,
          s`expected:${group}\ngot:${r.data?.group}`,
        ).to.deep.eq(group)
      })
      .catch(e => expect(e).to.be.undefined))

  it('contains the admin', () =>
    get_group_details(group?.id)
      .then(r => {
        expect(r.ok, str(r.error)).to.be.true
        return expect(r.data?.users?.map(u => u.id)).to.deep.contain(
          group?.admin_id,
        )
      })
      .catch(e => expect(e).to.be.undefined))
})

describe('group join', () => {
  const password = 'toor1234'
  let iota = 0
  const register = (username: string) =>
    post_register(
      'Ashley',
      'Gavin',
      username,
      `agavin${++iota}@gmail.com`,
      password,
    )

  const creation_user = 'cuser'
  const join_user = 'juser'
  const group_name = 'Groceries'
  let group: Group

  before(async () => {
    // prepare creating user
    await register(creation_user)
    await post_login(creation_user, password)
    group = await post_group_create({
      name: group_name,
    }).then(r => (expect(r.ok, str(r.error)).to.be.true, r.data!))
    await post_logout()

    // prepare joining user
    await register(join_user)
  })

  beforeEach(async () => {
    await post_login(join_user, password).then(
      r => expect(r.ok, str(r.error)).to.be.true,
    )
  })

  it('fails to join: invalid hash', () =>
    post_group_join({
      group_id: group.id,
      hash: 1,
    })
      .then(r => expect(r.ok, str(r.error)).to.be.false)
      .then(() => get_group_list())
      .then(
        r => (
          expect(r.ok, str(r.error)).to.be.true,
          expect(r.data?.groups).not.to.deep.contain(group)
        ),
      ))

  it('fails to join: invalid id', () =>
    post_group_join({
      group_id: -5,
      hash: group.hash,
    })
      .then(r => expect(r.ok, str(r.error)).to.be.false)
      .then(() => get_group_list())
      .then(
        r => (
          expect(r.ok, str(r.error)).to.be.true,
          expect(r.data?.groups).not.to.deep.contain(group)
        ),
      ))

  it('succeeds with valid credentials', () =>
    post_group_join({
      group_id: group.id,
      hash: group.hash,
    })
      .then(r => expect(r.ok, str(r.error)).to.be.true)
      .then(() => get_group_list())
      .then(
        r => (
          expect(r.ok, str(r.error)).to.be.true,
          expect(r.data?.groups, str(r.data?.groups)).to.deep.contain(group)
        ),
      ))

  after(async () => {
    await delete_users()
    await delete_groups()
  })
})
