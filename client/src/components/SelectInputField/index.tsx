import { HTMLInputTypeAttribute, useEffect, useState } from 'react'

export interface FieldChoice {
  value: string
  label: string
}

export interface SelectInputFieldProps {
  /** Runs after every field update, given that the `validate(val) == true`. */
  onUpdate: (val: string) => void
  /** Label to be displayed inside of, and then above the input field. */
  label: string
  value?: string
  values?: FieldChoice[]
  className?: string
}

export enum TextInputFieldState {
  Empty,
  Valid,
  Invalid,
}

export const SelectInputField = ({
  onUpdate,
  label,
  value,
  values,
  className,
}: SelectInputFieldProps) => {
  const [val, setVal] = useState(value)
  const id = `select_input_${label}`
  console.dir(val)

  useEffect(() => {
    if (value && val !== value) {
      setVal(value!)
    }
  }, [value])

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault()
    const newVal = e.target.value

    setVal(newVal)
    onUpdate(newVal)
  }

  return (
    <div className={`text_input text_input--valid ${className ?? ''}`}>
      <label htmlFor={id} className='text_input__label'>
        {label}
      </label>
      <select
        value={val ?? ''}
        name={label}
        id={id}
        className='text_input__input'
        onChange={onChange}
        placeholder={label}
      >
        <option value='' disabled>
          {label}
        </option>
        {(values ?? []).map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
