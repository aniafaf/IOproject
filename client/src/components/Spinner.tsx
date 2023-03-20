import { Backdrop, CircularProgress } from '@mui/material'

export interface SpinnerParams {
  open?: boolean
}

export const Spinner = ({ open }: SpinnerParams) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={open ?? true}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
