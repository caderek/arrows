type Is = (prototype: Function) => (val: any) => boolean

const is: Is = (prototype) => (val) => val instanceof prototype

export { is }
export default is
