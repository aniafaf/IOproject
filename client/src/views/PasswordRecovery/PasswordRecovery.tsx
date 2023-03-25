import { Typography, createTheme, ThemeProvider, Grid } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { Spinner } from '../../components/Spinner'
import { TextInputField } from '../../components/TextInputField'
import { NotFound } from '../views/404'

function PasswordRecovery() {
  return (
    <CenterSplitLayout>
              <FieldSet>
                <FormHeading
                  title={`Trouble logging in?`}
                  subTitle={`Enter your email and we'll send you a link to get back into your account.`}
                />
                <TextInputField
                  label='email'
                  onUpdate={() => {}}
                  validate={_ => false}
                />
              </FieldSet>
              <FieldSet>
                <FormButton>send reset link</FormButton>
                <FormLink align='center'>Back to log in</FormLink>
              </FieldSet>
    </CenterSplitLayout>
  );
}

export { PasswordRecovery };
