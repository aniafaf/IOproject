import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from "react"

export const RegisterView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <>
      <NotLoggedInGuard />
      <CenterSplitLayout>
        <FieldSet width={'300px'}>
          <TextInputField
            label='first name'
            validate={_ => false}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInputField
            label='last name'
            validate={_ => false}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInputField
            label='username'
            validate={_ => false}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInputField
            label='email'
            validate={_ => false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInputField
            label='password'
            type={'password'}
            validate={_ => false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FieldSet>
        <FieldSet>
          <FormButton>sign up</FormButton>
          <FormLink to={Route.login()} align='center'>
            Already have an account? Log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  );
}
