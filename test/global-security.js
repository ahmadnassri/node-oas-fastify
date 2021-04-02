const plugin = require('../lib')
const { test } = require('tap')

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
        }
      }
    }
  ]
}

test('global security', assert => {
  assert.plan(2)

  let schema
  const result = []

  // fastify mock
  const fastify = {
    addSchema: (spec) => (schema = spec),
    route: (route) => result.push(route)
  }

  plugin(fastify, { spec: fixtures.oas, handler: {} }, () => {})

  assert.match(result, fixtures.fastify)
  assert.strictSame(fixtures.oas, schema)
})
