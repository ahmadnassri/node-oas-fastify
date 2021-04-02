module.exports = function (fastifyRoute, securitySchemes, routeSecurity) {
  // Either the securitySchemes or the security definition for the method is missing
  if (!securitySchemes || Object.keys(securitySchemes).length === 0 || !routeSecurity) {
    return false
  }

  const routeSecurityKeys = routeSecurity.map(security => Object.keys(security)).flat()

  // loop through all securitySchemes
  Object.entries(securitySchemes)
    .filter(([name]) => routeSecurityKeys.includes(name)) // filter to matching names
    .forEach(([name, security]) => {
      // handle http security
      if (security.type === 'http') {
      // flag "Authorization" header as required
      // doesn't matter if it's duplicated
        fastifyRoute.schema.headers.required.push('authorization')

        // define schema for "Authorization" header if it doesn't exist
        /* istanbul ignore else */
        if (!fastifyRoute.schema.headers.properties.authorization) {
          fastifyRoute.schema.headers.properties.authorization = {
            type: 'string'
          }
        }
      }

      // handle apiKey security
      if (security.type === 'apiKey') {
        const securitySchema = security.in === 'query' ? 'query' : 'headers'
        const securityName = security.in === 'cookie' ? 'Set-Cookie' : security.name

        // flag securityName as required
        fastifyRoute.schema[securitySchema].required.push(securityName)

        // define schema for securityName if it doesn't exist
        /* istanbul ignore else */
        if (!fastifyRoute.schema[securitySchema].properties[securityName]) {
          fastifyRoute.schema[securitySchema].properties[securityName] = {
            type: 'string'
          }
        }
      }

    // TODO oauth2, openIdConnect
    })
}
