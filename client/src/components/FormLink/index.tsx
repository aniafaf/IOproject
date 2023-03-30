import { CSSProperties, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export interface FormLinkProps {
  to: string
  style?: CSSProperties
  align?: CanvasTextAlign
}
export const FormLink = ({
  to,
  children,
  style,
  align,
}: PropsWithChildren<FormLinkProps>) => (
  <Link
    to={to}
    className='form_link'
    style={{ textAlign: align ?? 'right', ...style }}
  >
    {children}
  </Link>
)
