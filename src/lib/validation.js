const validation = module.exports = {}

validation.hasProperties = (obj, properties) => {
  return !(properties.map(p => obj.hasOwnProperty(p))).includes(false)
}
