import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from 'react'
import { post_login } from '../../api/post_login'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../hooks/alert'

export const LoginView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    alert.hide()
    post_login(username, password).then(r => {
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
        <FormHeading
          title={`Welcome to AccountApp`}
          subTitle={`Manage all your finances in one place.`}
        />
        <FieldSet>
          <TextInputField label='username' onUpdate={setUsername} />
          <TextInputField
            label='password'
            type='password'
            onUpdate={setPassword}
          />
          <FormLink to={Route.recovery()}>Forgot password?</FormLink>
        </FieldSet>
        <FieldSet>
          <FormButton onClick={handleSubmit}>log in</FormButton>
          <FormLink to={Route.sign_up()} align='center'>
            Don’t have an account? Sign up
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
