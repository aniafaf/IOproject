import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'

export const RegisterView = () => (
  <CenterSplitLayout>
    <FieldSet>
      <TextInputField
        label='first name'
        onUpdate={() => {}}
        validate={_ => false}
      />
      <TextInputField
        label='last name'
        onUpdate={() => {}}
        validate={_ => false}
      />
      <TextInputField
        label='username'
        onUpdate={() => {}}
        validate={_ => false}
      />
      <TextInputField label='email' onUpdate={() => {}} validate={_ => false} />
      <TextInputField
        label='password'
        type={'password'}
        onUpdate={() => {}}
        validate={_ => false}
      />
    </FieldSet>
    <FieldSet>
      <FormButton>sign up</FormButton>
      <FormLink align='center'>Already have an account? Log in</FormLink>
    </FieldSet>
  </CenterSplitLayout>
)
