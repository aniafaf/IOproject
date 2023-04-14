export const str = <T>(x: T): string =>
  typeof x === 'object' ? JSON.stringify(x, null, 2) : `${x}`

export const s = (strings: TemplateStringsArray, ...args: any[]) =>
  strings[0] +
  new Array(args.length)
    .fill(0)
    .reduce((u, _, i) => u + str(args[i]) + strings[i + 1], '')
