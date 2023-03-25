import { Typography, createTheme, ThemeProvider, Grid } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { CenterSplitLayout } from './components/CenterSplitLayout'
import { Spinner } from './components/Spinner'
import { NotFound } from './views/404'

function App() {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          Component: () => <CenterSplitLayout>[Placeholder]</CenterSplitLayout>,
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
