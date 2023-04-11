import { createTheme, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Spinner } from './components/Spinner'
import { NotFound } from './views/404'
import { LoginView } from './views/Login'
import { RegisterView } from './views/Register'
import { ActiveAccountView } from './views/ActiveAccount'
import { HomeView } from './views/Home'
import { Route, RoutePattern } from './routes'
import { GroupListView } from './views/Groups'
import { GroupView } from './views/Groups/[groupId]'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: Route.login(),
          element: <LoginView />,
        },
        {
          path: Route.sign_up(),
          element: <RegisterView />,
        },
        {
          path: Route.activate(),
          element: <ActiveAccountView />,
        },
        {
          path: Route.groups.list(),
          element: <GroupListView />,
        },
        {
          path: RoutePattern.group(),
          element: <GroupView />,
        },
        {
          path: Route.home(),
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
