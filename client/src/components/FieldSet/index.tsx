import { PropsWithChildren } from 'react'
import './index.css'

export const FieldSet = ({ children }: PropsWithChildren) => (
  <div className='form_set'>{children}</div>
)
