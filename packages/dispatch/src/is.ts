type Is = (prototype: Function) => (val: any) => boolean

const is: Is = (prototype) => (val) => val instanceof prototype

export default is
