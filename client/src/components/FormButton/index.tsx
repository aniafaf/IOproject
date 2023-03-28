import { CSSProperties, PropsWithChildren } from 'react'
import './index.css'

export interface FormButtonProps {
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
}

export const FormButton = ({
  onClick,
  disabled,
  children,
  style,
}: PropsWithChildren<FormButtonProps>) => (
  <button
    className='form_button'
    style={style}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)
