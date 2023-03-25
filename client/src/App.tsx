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
import { Login } from './views/Login/Login'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          Component: () => (
            <Login />
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
