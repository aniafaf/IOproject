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

function Register() {
  return (
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
                <FormLink align='center'>Already have an account? Log in</FormLink>
              </FieldSet>
    </CenterSplitLayout>
  );
}

export { Register };
