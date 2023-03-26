import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'

export const PasswordRecoveryView = () => (
  <CenterSplitLayout>
    <FieldSet>
      <FormHeading
        title={`Trouble logging in?`}
        subTitle={`Enter your email and we'll send you a link to get back into your account.`}
      />
      <TextInputField label='email' onUpdate={() => {}} validate={_ => false} />
    </FieldSet>
    <FieldSet>
      <FormButton>send reset link</FormButton>
      <FormLink align='center'>Back to log in</FormLink>
    </FieldSet>
  </CenterSplitLayout>
)
