import { CSSProperties } from 'react'
import './index.css'

export interface FormHeadingProps {
  title?: string
  subTitle?: string
  style?: CSSProperties
}

export const FormHeading = ({ title, subTitle, style }: FormHeadingProps) => {
  return (
    <header className='form_heading' style={style}>
      <h1 className='form_heading__title'>{title}</h1>
      <p className='form_heading__subtitle'>{subTitle}</p>
    </header>
  )
}
