import { CSSProperties, PropsWithChildren } from 'react'
import './index.css'

export interface FormLinkProps {
  to?: string
  style?: CSSProperties
  align?: CanvasTextAlign
}
export const FormLink = ({
  to,
  children,
  style,
  align,
}: PropsWithChildren<FormLinkProps>) => (
  <a
    href={to}
    className='form_link'
    style={{ textAlign: align ?? 'right', ...style }}
  >
    {children}
  </a>
)
