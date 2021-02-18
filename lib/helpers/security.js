module.exports = function (parameters, type, securitySchemes, securities) {
  // Either the securitySchemes or the security definition for the method is missing
  if (!securitySchemes || Object.keys(securitySchemes).length === 0 || !Array.isArray(securities)) {
    return parameters
  }

  if (!['header', 'query'].includes(type)) {
    return parameters
  }

  // Get all the securitySchemes that is used for `type`
  const securitySchemesForType = Object.keys(securitySchemes).reduce((result, schemeName) => {
    const securityScheme = securitySchemes[schemeName]
    if (type === 'header') {
      if (securityScheme.type === 'http' ||
        securityScheme.type === 'apiKey' && securityScheme.in === 'header') {
        return Object.assign({}, result, { [schemeName]: securityScheme })
      }
    } else {
      if (securityScheme.type === 'apiKey' && securityScheme.in === 'query') {
        return Object.assign({}, result, { [schemeName]: securityScheme })
      }
    }
    return result
  }, {})

  // exit early if there are no requested securitySchemes
  if (Object.keys(securitySchemesForType).length === 0) return parameters

  // TODO: See if there are anyways to accept OR relationships, this just flattens the relationships to AND
  const securityNames = securities.reduce((result, security) => result.concat(Object.keys(security)), [])
  const uniqueSecurityNames = [...new Set(securityNames)]

  // For each method security, add the required properties and attributes
  for (const uniqueSecurityName of uniqueSecurityNames) {
    const securityScheme = securitySchemesForType[uniqueSecurityName]

    // Method security is not defined in securityScheme, continue
    if (!securityScheme) {
      continue
    }

    if (securityScheme.type === 'http') {
      parameters.required.push('authorization')
      // add schema to route
      parameters.properties['authorization'] = {
        type: 'string'
      }
    } else {
      parameters.required.push(securityScheme.name.toLowerCase())
      // add schema to route
      parameters.properties[securityScheme.name.toLowerCase()] = {
        type: 'string'
      }
    }
  }

  return parameters
}
