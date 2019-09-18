type Includes = (element: any) => (arr: any[]) => boolean

const includes: Includes = (element) => (arr) => arr.includes(element)

export default includes
