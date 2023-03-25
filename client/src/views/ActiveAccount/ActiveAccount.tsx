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

function ActiveAccount() {
  return (
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
  );
}

export { ActiveAccount };
