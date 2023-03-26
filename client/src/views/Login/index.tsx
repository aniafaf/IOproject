import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'

export const LoginView = () => (
  <CenterSplitLayout>
    <FormHeading
      title={`Welcome to _our_name_`}
      subTitle={`Manage all your finances in one place.`}
    />
    <FieldSet>
      <TextInputField label='email' onUpdate={() => {}} validate={_ => false} />
      <TextInputField
        label='password'
        type='password'
        onUpdate={() => {}}
        validate={_ => false}
      />
      <FormLink to={Route.recovery()}>Forgot password?</FormLink>
    </FieldSet>
    <FieldSet>
      <FormButton>log in</FormButton>
      <FormLink to={Route.sign_up()} align='center'>Don’t have an account? Sign up</FormLink>
    </FieldSet>
  </CenterSplitLayout>
)
