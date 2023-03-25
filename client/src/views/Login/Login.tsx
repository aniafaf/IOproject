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

function Login() {
  return (
    <CenterSplitLayout>
              <FormHeading
                title={`Welcome to _our_name_`}
                subTitle={`Manage all your finances in one place.`}
              />
              <FieldSet>
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
                <FormLink>Forgot password?</FormLink>
              </FieldSet>
              <FieldSet>
                <FormButton>log in</FormButton>
                <FormLink align='center'>Don’t have an account? Sign up</FormLink>
              </FieldSet>
    </CenterSplitLayout>
  );
}

export { Login };
