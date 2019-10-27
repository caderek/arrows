type _Slice = <T>(from: number, to: number, arr: T[]) => T[]

const _slice: _Slice = (from, to, arr) => arr.slice(from, to)
