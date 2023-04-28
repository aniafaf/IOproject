import { CSSProperties } from 'react'
import './index.css'

export interface FormHeadingProps {
  title?: string
  subTitle?: string
  style?: CSSProperties
  className?: string
  titleClassName?: string
}

export const FormHeading = ({
  title,
  subTitle,
  style,
  className,
  titleClassName,
}: FormHeadingProps) => {
  return (
    <header className={`form_heading ${className ?? ''}`} style={style}>
      <h1 className={`form_heading__title ${titleClassName ?? ''}`}>{title}</h1>
      <p className='form_heading__subtitle'>{subTitle}</p>
    </header>
  )
}
