const test = require('node:test')
const assert = require('node:assert')

const plugin = require('../lib')

const fixtures = {
  oas: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Auth Example'
    },
    security: [
      {
        httpAuth: []
      }
    ],
    paths: {
      '/foo': {
        get: {
          operationId: 'foo'
        }
      }
    },
    components: {
      securitySchemes: {
        httpAuth: {
          type: 'http',
          scheme: 'basic'
        }
      }
    }
  },

  fastify: [
    {
      method: 'GET',
      url: '/foo',
      schema: {
        headers: {
          type: 'object',
          required: [
            'authorization'
          ],
          properties: {
            authorization: {
              type: 'string'
            }
          }
        },
        params: {
          properties: {},
          required: [],
          type: 'object'
        },
        query: {
          properties: {},
          required: [],
          type: 'object'
        },
        response: {}
      }
    }
  ]
}

test('global security', () => {
  let schema
  const result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }


  plugin(fastify, { spec: fixtures.oas, handler: {} }, () => {})

  // remove handler for test with deepEqual
  delete result[0].handler

  assert.deepEqual(result, fixtures.fastify)
  assert.strictEqual(fixtures.oas, schema)
})
