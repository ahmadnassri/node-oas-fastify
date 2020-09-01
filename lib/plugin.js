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
          headers: { type: 'object', required: [], properties: {} },
          response: {}
        }
      }

      // if a requestBody is present, get the first one
      // OAS 3.x supports multiple body types, where fastify only supports one
      if (oasRoute.requestBody &&
          oasRoute.requestBody.content) {
        // get the first one
        const [[contentType, { schema }]] = Object.entries(oasRoute.requestBody.content)

        fastifyRoute.schema.headers.required.push('content-type')
        fastifyRoute.schema.headers.properties['content-type'] = {
          const: contentType
        }

        // add body schema
        fastifyRoute.schema.body = schema
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
      /* istanbul ignore next */
      fastifyRoute.handler = function routeHandler (request, reply) {
        return opts.handler[oasRoute.operationId](request, reply, instance)
      }

      instance.route(fastifyRoute)
    }
  }

  next()
}
