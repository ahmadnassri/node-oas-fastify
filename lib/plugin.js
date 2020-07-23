const convertPath = require('./helpers/convert-path')
const parameters = require('./helpers/parameters')

module.exports = function (instance, opts, next) {
  // TODO check & validate opts.spec

  // associate schema
  instance.addSchema(opts.spec)

  // process all paths
  for (const path in opts.spec.paths) {
    // process each path spec
    const pathSpec = opts.spec.paths[path]

    // process each method
    for (const method in pathSpec) {
      const oasRoute = pathSpec[method]

      // construct the fastify route
      const fastifyRoute = {
        method: method.toUpperCase(),
        url: convertPath(path),
        schema: {
          params: parameters(oasRoute.parameters, 'path'),
          query: parameters(oasRoute.parameters, 'query'),
          response: {}
        }
      }

      // process all responses
      for (const status in oasRoute.responses) {
        // skip "default"
        if (status === 'default') continue

        // process each response schema
        const responseSpec = oasRoute.responses[status]

        // TODO handle other types
        let responseSchema

        // TODO: const json = responseSpec?.content?.['application/json']?.schema 😭
        if (responseSpec.content &&
            responseSpec.content['application/json'] &&
            responseSpec.content['application/json'].schema) {
          responseSchema = responseSpec.content['application/json'].schema
        }

        // add to route
        if (responseSchema) fastifyRoute.schema.response[status] = responseSchema
      }

      // associate handler
      fastifyRoute.handler = opts.handler[oasRoute.operationId]

      instance.route(fastifyRoute)
    }
  }

  next()
}
