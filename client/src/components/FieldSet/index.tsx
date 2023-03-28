import { PropsWithChildren } from 'react'
import './index.css'

export interface FieldSetProps {
  width?: string | number
}

export const FieldSet = ({
  children,
  width,
}: PropsWithChildren<FieldSetProps>) => (
  <div className='form_set' style={{ '--width': width } as any}>
    {children}
  </div>
)
