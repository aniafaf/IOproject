import { beforeEach, describe, expect, it } from 'vitest'
import { post_login } from '../post_login'
import { post_register } from '../post_register'
import { delete_users } from '../test/delete_users'

describe('post_login', () => {
  const invalidUsernames = ['jkowalski!', 'jkowalski@', 'jkowalski$']
  const firstName = 'Jan'
  const lastName = 'Kowalski'
  const password = 'lol12345'

  beforeEach(async () => {
    await delete_users()
  })

  it('valid user', async () => {
    const username = 'jkowalski'
    const email = 'jkowalski1@gmail.com'
    await post_register(firstName, lastName, username, email, password).then(
      r => (console.dir({debug: r}, {depth: 15}), expect(r.ok).toBeTruthy()),
    )
    await post_login(username, password).then(r => expect(r.ok).toBeTruthy())
  })

  it('invalid username, contains ! character', async () => {
    const email = 'jkowalski2@gmail.com'
    await post_register(
      firstName,
      lastName,
      invalidUsernames[0],
      email,
      password,
    ).then(r => expect(r.ok).toBeFalsy())
    await post_login(invalidUsernames[0], password).then(r =>
      expect(r.ok).toBeFalsy(),
    )
  })

  it('invalid username, contains @ character', async () => {
    const email = 'jkowalski3@gmail.com'
    await post_register(
      firstName,
      lastName,
      invalidUsernames[1],
      email,
      password,
    ).then(r => expect(r.ok).toBeFalsy())
    await post_login(invalidUsernames[1], password).then(r =>
      expect(r.ok).toBeFalsy(),
    )
  })

  it('invalid username, contains $ character', async () => {
    const email = 'jkowalski4@gmail.com'
    await post_register(
      firstName,
      lastName,
      invalidUsernames[2],
      email,
      password,
    ).then(r => expect(r.ok).toBeFalsy())
    await post_login(invalidUsernames[2], password).then(r =>
      expect(r.ok).toBeFalsy(),
    )
  })

  it('invalid password, less than 8 characters', async () => {
    const invalidPassword = 'lol'
    const username = 'jankowalski'
    const email = 'jkowalski5@gmail.com'
    await post_register(
      firstName,
      lastName,
      username,
      email,
      invalidPassword,
    ).then(r => expect(r.ok).toBeFalsy())
    await post_login(username, invalidPassword).then(r =>
      expect(r.ok).toBeFalsy(),
    )
  })

  it('invalid username, username already taken', async () => {
    const email = 'jkowalski6@gmail.com'
    const username = 'kowalskijan'
    await post_register(firstName, lastName, username, email, password).then(
      r => expect(r.ok).toBeTruthy(),
    )
    await post_login(username, password).then(r => expect(r.ok).toBeTruthy())

    await post_register(
      firstName,
      lastName,
      username,
      'jkowalski7@gmail.com',
      password,
    ).then(r => expect(r.ok).toBeFalsy())
  })
})
