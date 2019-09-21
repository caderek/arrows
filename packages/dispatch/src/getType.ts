const getType = (val) => Object.prototype.toString.call(val).slice(8, -1)

export default getType
