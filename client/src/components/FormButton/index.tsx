import { CSSProperties, PropsWithChildren } from 'react'
import './index.css'

export interface FormButtonProps {
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

export const FormButton = ({
  onClick,
  disabled,
  children,
  style,
  type,
}: PropsWithChildren<FormButtonProps>) => (
  <button
    className='form_button'
    style={style}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
)
