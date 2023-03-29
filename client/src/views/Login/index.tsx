import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from "react"

export const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <>
      <NotLoggedInGuard />
      <CenterSplitLayout>
        <FormHeading
          title={`Welcome to _our_name_`}
          subTitle={`Manage all your finances in one place.`}
        />
        <FieldSet onSubmit={handleSubmit}>
          <TextInputField
            label='email'
            validate={_ => true}
            value={email}
            onUpdate={setEmail}
          />
          <TextInputField
            label='password'
            type='password'
            validate={_ => true}
            value={password}
            onUpdate={setPassword}
          />
          <FormLink to={Route.recovery()}>Forgot password?</FormLink>
        </FieldSet>
        <FieldSet>
          <FormButton>log in</FormButton>
          <FormLink to={Route.sign_up()} align='center'>
            Don’t have an account? Sign up
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  );
}
