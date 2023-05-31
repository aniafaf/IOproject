import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post_recover } from '../../api/post_recover'
import { useAlert } from '../../hooks/alert'
import { Spinner } from '../../components/Spinner'
import { post_recover_password } from '../../api/post_recover_password'

export const PasswordRecoveryView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    alert.hide()
    post_recover_password(password, passwordConfirmation).then(
      navigate(Route.reset_password_complete()),
    )
  }

  return (
    <>
      <NotLoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <CenterSplitLayout>
        <FieldSet>
          <FormHeading
            title={`Enter new password`}
            subTitle={`Please enter your new password`}
          />
          <TextInputField label='password' onUpdate={setPassword} />
          <TextInputField
            label='password confirmation'
            onUpdate={setPasswordConfirmation}
          />
        </FieldSet>
        <FieldSet>
          <FormButton onClick={handleSubmit}>reset password</FormButton>
          <FormLink to={Route.login()} align='center'>
            Back to log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
