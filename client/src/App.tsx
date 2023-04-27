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
import { GroupCreateView } from './views/Groups/create'
import { GroupJoinView } from './views/Groups/[groupId]/join'
import { EventAddView } from './views/Groups/[groupId]/events/add'

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
          path: RoutePattern.group_event_add(),
          element: <EventAddView />,
        },
        {
          path: Route.groups.list(),
          element: <GroupListView />,
        },
        {
          path: Route.groups.create(),
          element: <GroupCreateView />,
        },
        {
          path: RoutePattern.group_join(),
          element: <GroupJoinView />,
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
