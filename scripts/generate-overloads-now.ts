import * as fs from 'fs'
import arr from '@arrows/array'
import { pipe } from '@arrows/composition'

const generateSingleOverload = (ascending) => (length) => {
  const range = arr.range_(1, length + 1)

  const typesList = pipe(
    arr.map((x) => `T${x}`),
    arr.join(', '),
  )(range)

  const genericsList = `<${typesList}, R>`

  const fnsList = pipe(
    arr.map((x: number, i: number, arr: number[]) => {
      const isLast = i === arr.length - 1
      const returnType = isLast ? 'R' : `T${x + 1}`
      return `fn${x}: (arg: T${x}) => ${returnType}`
    }),
    !ascending ? arr.reverse : (x) => x,
    arr.join(', '),
  )(range)

  const fullType = `${genericsList}(initialArg: T1, ${fnsList}): R`

  return fullType
}

const generateOverloads = (length, name, ascending) => {
  const range = arr.range_(1, length + 1)

  const overloads = pipe(
    arr.map(generateSingleOverload(ascending)),
    arr.join('\n\n'),
  )(range)

  const defaultOverload = `(initialArg: any, ...fns: Array<(arg: any) => any>): unknown`

  const content = `export type ${name}${length} = {${overloads}\n\n${defaultOverload}}\n\n`
  fs.writeFileSync(
    `packages/composition/src/${name.toLowerCase()}.types.ts`,
    content,
    {
      flag: 'w',
    },
  )
}

generateOverloads(20, 'PipeNow', true)
generateOverloads(20, 'ComposeNow', false)
// generateOverloads(50)
// generateOverloads(100)
