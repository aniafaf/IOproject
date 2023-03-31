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

export const LoginView = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    post_login(username, password).then(r => {
      if (r.ok) {
        navigate('/')
      } else {
        alert('BŁĄD')
        console.log(r.error)
      }
    })
  }

  return (
    <>
      <NotLoggedInGuard />
      <CenterSplitLayout>
        <FormHeading
          title={`Welcome to _our_name_`}
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
