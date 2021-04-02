const plugin = require('../lib/')
const { test } = require('tap')

const openAPISpec = require('./fixtures/openapi.json')
const fastifySpec = require('./fixtures/fastify.json')

const openAPISpecSecurity = require('./fixtures/openapi-with-security.json')
const fastifySpecSecurity = require('./fixtures/fastify-with-security.json')

test('oas-to-fastify', assert => {
  assert.plan(2)

  let schema
  const result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  plugin(fastify, { spec: openAPISpec, handler: {} }, () => {})

  // replace handler Placeholder with Function for comparison
  const fastifySpecWithFunc = fastifySpec.map(route => ({ ...route, handler: Function }))

  assert.match(result, fastifySpecWithFunc)
  assert.strictSame(openAPISpec, schema)
})

test('oas-to-fastify with security', assert => {
  assert.plan(2)

  let schema
  const result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  // handler mock
  const handler = {}

  plugin(fastify, { spec: openAPISpecSecurity, handler }, () => {})

  assert.match(result, fastifySpecSecurity)
  assert.strictSame(openAPISpecSecurity, schema)
})
