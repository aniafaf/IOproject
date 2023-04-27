type Curried<Args extends any[], Ret extends any> = Args extends []
  ? () => Ret
  : Args extends [infer A]
  ? (arg: A) => Ret
  : Args extends [infer A, ...infer As]
  ? (arg: A) => Curried<As, Ret>
  : never

export const curry = <F extends (...args: any[]) => any>(
  f: F,
): Curried<Parameters<F>, ReturnType<F>> => {
  const num_of_args = f.length
  const aux = (curried: unknown[]) => (a?: unknown) =>
    curried.length === num_of_args
      ? f(...curried)
      : curried.length === num_of_args - 1 && a !== undefined
      ? f(...curried, a)
      : aux([...curried, a])

  return aux([]) as Curried<Parameters<F>, ReturnType<F>>
}
