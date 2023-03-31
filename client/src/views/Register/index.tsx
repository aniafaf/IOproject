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

export const RegisterView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    alert.hide()
    post_register(firstName, lastName, username, email, password).then(r => {
      if (r.ok) {
        navigate('/')
      } else {
        alert.display(r.error, 'error')
      }
    })
  }

  return (
    <>
      <alert.AlertComponent />
      <NotLoggedInGuard />
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
