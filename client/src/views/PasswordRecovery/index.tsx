import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { post_recover } from "../../api/post_recover";

export const PasswordRecoveryView = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    post_recover(email).then(r => {
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
        <FieldSet>
          <FormHeading
            title={`Trouble logging in?`}
            subTitle={`Enter your email and we'll send you a link to get back into your account.`}
          />
          <TextInputField
            label='email'
            onUpdate={setEmail}
          />
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
