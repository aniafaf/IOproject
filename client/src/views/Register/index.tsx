import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from 'react'
import { post_login } from '../../api/post_login'
import { useNavigate } from 'react-router-dom'
import { post_register } from '../../api/post_register'
import { useAlert } from '../../hooks/alert'
import { Spinner } from '../../components/Spinner'

export const RegisterView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    alert.hide()

    post_register(firstName, lastName, username, email, password)
      .then(r =>
        r.ok ? navigate(Route.home()) : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <NotLoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <CenterSplitLayout>
        <FieldSet>
          <TextInputField label='first name' onUpdate={setFirstName} />
          <TextInputField label='last name' onUpdate={setLastName} />
          <TextInputField label='username' onUpdate={setUsername} />
          <TextInputField label='email' onUpdate={setEmail} />
          <TextInputField
            label='password'
            type='password'
            onUpdate={setPassword}
          />
        </FieldSet>
        <FieldSet>
          <FormButton onClick={handleSubmit}>sign up</FormButton>
          <FormLink to={Route.login()} align='center'>
            Already have an account? Log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
