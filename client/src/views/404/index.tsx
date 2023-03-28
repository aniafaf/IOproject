import { Typography } from '@mui/material'

export const NotFound = () => {
  const path = document.location.pathname

  return (
    <Typography variant='h3'>
      [placeholder] Error 404: page {path} not found
    </Typography>
  )
}
