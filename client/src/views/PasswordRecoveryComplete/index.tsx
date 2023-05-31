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

export const PasswordRecoveryCompleteView = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <NotLoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <CenterSplitLayout>
        <FieldSet>
          <FormHeading
            title={`Password reset complete`}
            subTitle={`Your password has been set. You may go ahead and log in now.`}
          />
        </FieldSet>
        <FieldSet>
          <FormLink to={Route.login()} align='center'>
            Log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
