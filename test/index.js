const plugin = require('../lib/')
const { test } = require('tap')

const openAPISpec = require('./fixtures/openapi.json')
const fastifySpec = require('./fixtures/fastify')

test('oas-to-fastify', assert => {
  assert.plan(2)

  let schema
  const result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  // handler mock
  const handler = {
    listPets: 'listPets',
    createPets: 'createPets',
    showPetById: 'showPetById'
  }

  plugin(fastify, { spec: openAPISpec, handler }, () => {})

  assert.deepEqual(result, fastifySpec)
  assert.strictSame(openAPISpec, schema)
})
