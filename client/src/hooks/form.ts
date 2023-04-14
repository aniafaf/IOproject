import { useReducer } from 'react'

interface FormAction<P, K extends keyof P = keyof P> {
  field: K
  value: P[K]
}

export const useForm = <F extends Object>(
  def: Partial<F> = {},
): [<P extends keyof F>(field: P, value: F[P]) => void, F] => {
  const [state, dispatch] = useReducer(
    (old: Partial<F>, { field, value }: FormAction<F>) =>
      ({
        ...old,
        [field]: value,
      } as Partial<F>),
    { ...def },
  )

  return [
    (field, value) =>
      dispatch({
        field,
        value,
      }),
    state as F,
  ]
}
