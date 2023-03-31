import { createTheme, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Spinner } from './components/Spinner'
import { NotFound } from './views/404'
import { LoginView } from './views/Login'
import { RegisterView } from './views/Register'
import { PasswordRecoveryView } from './views/PasswordRecovery'
import { ActiveAccountView } from './views/ActiveAccount'
import { HomeView } from './views/Home'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '/login',
          element: <LoginView />,
        },
        {
          path: '/sign-up',
          element: <RegisterView />,
        },
        {
          path: '/activate',
          element: <ActiveAccountView />,
        },
        {
          path: '/',
          element: <HomeView />,
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
