import { Alert, AlertColor, Snackbar } from '@mui/material'
import { useState } from 'react'

export interface AlertState {
  display: (msg: string, severity: AlertColor) => void
  hide: () => void
  AlertComponent: () => JSX.Element
}

export const useAlert = (): AlertState => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info')

  const hide = () => {
    setShowAlert(false)
  }

  const AlertComponent = () => (
    <Snackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      open={showAlert}
      autoHideDuration={6000}
      onClose={hide}
    >
      <Alert onClose={hide} severity={alertSeverity} sx={{ width: '100%' }}>
        {alertMsg}
      </Alert>
    </Snackbar>
  )

  return {
    display: (msg, severity) => {
      setAlertMsg(msg)
      setAlertSeverity(severity)
      setShowAlert(true)
    },
    hide,
    AlertComponent,
  }
}
