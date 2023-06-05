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
import { EventView } from './views/Groups/[groupId]/events/[eventId]'
import { PaymentAddView } from './views/Groups/[groupId]/events/[eventId]/payments/add'
import { PasswordRecoveryView } from './views/PasswordRecovery'
import { PasswordRecoveryCompleteView } from './views/PasswordRecoveryComplete'
import { PasswordRecoverySentView } from './views/PasswordRecoverySent'
import { PasswordRecoveryConfirmView } from './views/PasswordRecoveryConfirm'

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
          path: Route.recovery(),
          element: <PasswordRecoveryView />,
        },
        {
          path: Route.reset_password_complete(),
          element: <PasswordRecoveryCompleteView />,
        },
        {
          path: Route.reset_password_sent(),
          element: <PasswordRecoverySentView />,
        },
        {
          path: Route.activate(),
          element: <ActiveAccountView />,
        },
        {
          path: Route.reset_password_confirm(),
          element: <PasswordRecoveryConfirmView />,
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
          path: RoutePattern.group_event(),
          element: <EventView />,
        },
        {
          path: RoutePattern.group_event_payment_add(),
          element: <PaymentAddView />,
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
