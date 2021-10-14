import { multi, method } from './index'

const not = (x: any) => (y: any) => x !== y

const fn = multi(method([not(1), 2], 'ok'), method('default'))

console.log(fn(3, 1))
