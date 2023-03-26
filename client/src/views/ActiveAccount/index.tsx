import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'

export const ActiveAccountView = () => (
  <CenterSplitLayout>
    <FieldSet>
      <FormHeading
        title={`Enter an activation code`}
        subTitle={`We sent you a code via email.`}
      />
      <TextInputField
        label='activation code'
        onUpdate={() => {}}
        validate={_ => false}
      />
    </FieldSet>
    <FieldSet>
      <FormButton>sign up</FormButton>
      <FormLink align='center'>Back to log in</FormLink>
    </FieldSet>
  </CenterSplitLayout>
)
