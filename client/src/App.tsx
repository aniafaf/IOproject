import { Typography, createTheme, ThemeProvider, Grid } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { CenterSplitLayout } from './components/CenterSplitLayout'
import { FieldSet } from './components/FieldSet'
import { FormButton } from './components/FormButton'
import { FormHeading } from './components/FormHeading'
import { FormLink } from './components/FormLink'
import { Spinner } from './components/Spinner'
import { TextInputField } from './components/TextInputField'
import { NotFound } from './views/404'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          Component: () => (
            <CenterSplitLayout>
              <FormHeading
                title={`Welcome to _our_name_`}
                subTitle={`Manage all your finances in one place.`}
              />
              <FieldSet>
                <TextInputField
                  label='[PH]email'
                  onUpdate={() => {}}
                  validate={_ => false}
                />
                <TextInputField
                  label='[PH]password'
                  type={'password'}
                  onUpdate={() => {}}
                  validate={_ => false}
                />
                <FormLink>[PH]Forgot password?</FormLink>
              </FieldSet>
              <FieldSet>
                <FormButton>log in</FormButton>
                <FormLink align='center'>[PH]Forgot password?</FormLink>
              </FieldSet>
            </CenterSplitLayout>
          ),
        },
      ],
    },
  ])

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
