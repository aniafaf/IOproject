import { HTMLInputTypeAttribute, useState } from 'react'
import './index.css'

export interface TextInputFieldProps {
  /** Returns `true` iff `val` is a valid input. For instance, given the field should contain an email address, it checks whether it's a valid email address. */
  validate?: (val: string) => boolean
  /** Runs after every field update, given that the `validate(val) == true`. */
  onUpdate: (val: string) => void
  /** Label to be displayed inside of, and then above the input field. */
  label: string
  /** Input type */
  type?: HTMLInputTypeAttribute
}

export enum TextInputFieldState {
  Empty,
  Valid,
  Invalid,
}

const classOfState = (state: TextInputFieldState): string => {
  return `text_input--${
    {
      [TextInputFieldState.Valid]: 'valid',
      [TextInputFieldState.Empty]: 'empty',
      [TextInputFieldState.Invalid]: 'invalid',
    }[state]
  }`
}

export const TextInputField = ({
  validate,
  onUpdate,
  label,
  type,
}: TextInputFieldProps) => {
  const [val, setVal] = useState('')
  const [state, setState] = useState<TextInputFieldState>(
    TextInputFieldState.Empty,
  )
  const id = `text_input_${label}`

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const newVal = e.target.value
    const valid = validate ? validate(newVal) : true

    setVal(newVal)
    if (valid) {
      onUpdate(newVal)
    }

    setState(
      newVal.length === 0
        ? TextInputFieldState.Empty
        : valid
        ? TextInputFieldState.Valid
        : TextInputFieldState.Invalid,
    )
  }

  return (
    <div className={`text_input ${classOfState(state)}`}>
      <label htmlFor={id} className='text_input__label'>
        {label}
      </label>
      <input
        value={val}
        type={type ?? 'text'}
        name={label}
        placeholder={label}
        id={id}
        className='text_input__input'
        onChange={onChange}
      />
    </div>
  )
}
