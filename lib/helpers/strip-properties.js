const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema')

/**
 *
 * Convert the OpenAPI schema to a JSON schema
 *
 * @param input
 * @returns {{properties}|*}
 */
module.exports = function stripProperties (input) {
  const schema = toJsonSchema(input, {
    keepNotSupported: ['readOnly', 'writeOnly']
  })

  delete schema.$schema

  return schema
}
