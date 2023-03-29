import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import React, { useState } from "react"

export const ActiveAccountView = () => {
  const [activationCode, setActivationCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <CenterSplitLayout>
      <FieldSet onSubmit={handleSubmit}>
        <FormHeading
          title={`Enter an activation code`}
          subTitle={`We sent you a code via email.`}
        />
        <TextInputField
          label='activation code'
          validate={_ => false}
          value={activationCode}
          onUpdate={setActivationCode}
        />
      </FieldSet>
      <FieldSet>
        <FormButton>sign up</FormButton>
        <FormLink to={Route.login()} align='center'>Back to log in</FormLink>
      </FieldSet>
    </CenterSplitLayout>
  );
}
