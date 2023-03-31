import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from 'react'
import { post_activate } from "../../api/post_activate";
import { useNavigate } from "react-router-dom";

export const ActiveAccountView = () => {
  const navigate = useNavigate()
  const [activationCode, setActivationCode] = useState('')

  const handleSubmit = () => {
    post_activate(activationCode).then(r => {
      if (r.ok) {
        navigate('/')
      } else {
        alert('BŁĄD')
        console.log(r.error)
      }
    })
  }

  return (
    <CenterSplitLayout>
      <FieldSet>
        <FormHeading
          title={`Enter an activation code`}
          subTitle={`We sent you a code via email.`}
        />
        <TextInputField
          label='activation code'
          validate={_ => false}
          onUpdate={setActivationCode}
        />
      </FieldSet>
      <FieldSet>
        <FormButton onClick={handleSubmit}>sign up</FormButton>
        <FormLink to={Route.login()} align='center'>
          Back to log in
        </FormLink>
      </FieldSet>
    </CenterSplitLayout>
  )
}
