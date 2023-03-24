import { Typography, createTheme, ThemeProvider, Grid } from '@mui/material'
import { StrictMode } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
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
          Component: () => (
            <Grid
              container
              spacing={0}
              direction='column'
              alignItems='center'
              justifyContent='center'
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3}>
                <Typography variant='h1'>[Placeholder]</Typography>
              </Grid>
            </Grid>
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
