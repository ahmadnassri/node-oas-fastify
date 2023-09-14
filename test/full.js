const test = require('node:test')
const assert = require('node:assert')

const plugin = require('../lib')

const openAPISpec = require('./fixtures/openapi.json')
const fastifySpec = require('./fixtures/fastify.json')

const openAPISpecSecurity = require('./fixtures/openapi-with-security.json')
const fastifySpecSecurity = require('./fixtures/fastify-with-security.json')

test('oas-to-fastify', () => {
  let schema
  let result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  plugin(fastify, { spec: openAPISpec, handler: {} }, () => {})

  // remove extra properties for test with assert.deepEqual
  result = result.map(result => {
    delete result.handler
    return result
  })

  assert.deepEqual(result[0], fastifySpec[0])
  assert.strictEqual(openAPISpec, schema)
})

test('oas-to-fastify with security', () => {
  let schema
  let result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  plugin(fastify, { spec: openAPISpecSecurity, handler: {} }, () => {})

  // remove extra properties for test with assert.deepEqual
  // delete result[0].schema.params
  // delete result[0].schema.query
  // delete result[0].schema.response

  result = result.map(result => {
    delete result.handler
    return result
  })

  assert.deepEqual(result, fastifySpecSecurity)
  assert.strictEqual(openAPISpecSecurity, schema)
})
