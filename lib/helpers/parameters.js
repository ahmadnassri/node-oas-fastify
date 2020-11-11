module.exports = function (parameters = [], type) {
  const schema = {
    type: 'object',
    required: [],
    properties: {}
  }

  if (!Array.isArray(parameters)) return schema

  // find by type
  const params = parameters.filter(p => p.in === type)

  // exit early
  if (params.length === 0) return schema

  // configure url parameters
  for (const param of params) {
    // add to required array
    if (param.required) schema.required.push(param.name)

    // add schema to route
    schema.properties[param.name] = param.schema
  }

  return schema
}
