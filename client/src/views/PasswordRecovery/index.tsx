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

export const PasswordRecoveryView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    alert.hide()

    post_recover(email)
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
          <FormHeading
            title={`Trouble logging in?`}
            subTitle={`Enter your email and we'll send you a link to get back into your account.`}
          />
          <TextInputField label='email' onUpdate={setEmail} />
        </FieldSet>
        <FieldSet>
          <FormButton onClick={handleSubmit}>send reset link</FormButton>
          <FormLink to={Route.login()} align='center'>
            Back to log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
