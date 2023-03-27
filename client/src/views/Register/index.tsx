import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormLink } from '../../components/FormLink'
import { NotLoggedInGuard } from '../../components/LoggedInGuard'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'

export const RegisterView = () => (
  <>
    <NotLoggedInGuard />
    <CenterSplitLayout>
      <FieldSet width={'300px'}>
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
        <TextInputField
          label='email'
          onUpdate={() => {}}
          validate={_ => false}
        />
        <TextInputField
          label='password'
          type={'password'}
          onUpdate={() => {}}
          validate={_ => false}
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
)
