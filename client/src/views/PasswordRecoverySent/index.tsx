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

export const PasswordRecoverySentView = () => {
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
            title={`Password reset sent`}
            subTitle={`We’ve emailed you instructions for setting your password, if an account exists 
                        with the email you entered. You should receive them shortly. If you don’t receive an email, 
                        please make sure you’ve entered the address you registered with, and check your spam folder.`}
          />
        </FieldSet>
        <FieldSet>
          <FormLink to={Route.login()} align='center'>
            Back to log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
