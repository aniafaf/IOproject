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
            validate={_ => true}
            value={firstName}
            onUpdate={setFirstName}
          />
          <TextInputField
            label='last name'
            validate={_ => true}
            value={lastName}
            onUpdate={setLastName}
          />
          <TextInputField
            label='username'
            validate={_ => true}
            value={username}
            onUpdate={setUsername}
          />
          <TextInputField
            label='email'
            validate={_ => true}
            value={email}
            onUpdate={setEmail}
          />
          <TextInputField
            label='password'
            type={'password'}
            validate={_ => true}
            value={password}
            onUpdate={setPassword}
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
