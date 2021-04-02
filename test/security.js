const { test } = require('tap')

const security = require('../lib/helpers/security')

const securitySchemes = {
  httpAuth: {
    type: 'http'
  },

  headerAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'X-API-Key'
  },

  queryAuth: {
    type: 'apiKey',
    in: 'query',
    name: 'X-API-Key'
  },

  cookieAuth: {
    type: 'apiKey',
    in: 'cookie',
    name: 'SessionID'
  }
}
test('security: only accept arrays', assert => {
  assert.plan(3)

  assert.notOk(security(null, {}, []))
  assert.notOk(security(null, undefined, []))
  assert.notOk(security(null, undefined, {}))
})

test('security: type=http ', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: [],
        properties: {}
      }
    }
  }

  security(fastifyRoute, securitySchemes, [{ httpAuth: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: ['authorization'],
        properties: {
          authorization: {
            type: 'string'
          }
        }
      }
    }
  })
})

test('security: type=apiKey in=header ', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: [],
        properties: {}
      }
    }
  }

  security(fastifyRoute, securitySchemes, [{ headerAuth: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: ['X-API-Key'],
        properties: {
          'X-API-Key': {
            type: 'string'
          }
        }
      }
    }
  })
})

test('security: type=apiKey in=query ', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {
        type: 'object',
        required: [],
        properties: {}
      },
      headers: {}
    }
  }

  security(fastifyRoute, securitySchemes, [{ queryAuth: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      headers: {},
      query: {
        type: 'object',
        required: ['X-API-Key'],
        properties: {
          'X-API-Key': {
            type: 'string'
          }
        }
      }
    }
  })
})

test('security: type=apiKey in=cookie ', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: [],
        properties: {}
      }
    }
  }

  security(fastifyRoute, securitySchemes, [{ cookieAuth: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      query: {},
      headers: {
        type: 'object',
        required: ['Set-Cookie'],
        properties: {
          'Set-Cookie': {
            type: 'string'
          }
        }
      }
    }
  })
})

test('security: ignore missing security types', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {},
      headers: {}
    }
  }

  security(fastifyRoute, securitySchemes, [{ Header: {}, Missing: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      query: {},
      headers: {}
    }
  })
})

test('security: multiple ', assert => {
  assert.plan(1)

  const fastifyRoute = {
    schema: {
      query: {
        type: 'object',
        required: [],
        properties: {}
      },
      headers: {
        type: 'object',
        required: [],
        properties: {}
      }
    }
  }

  security(fastifyRoute, securitySchemes, [{ httpAuth: {}, headerAuth: {}, queryAuth: {} }])

  assert.strictSame(fastifyRoute, {
    schema: {
      query: {
        type: 'object',
        required: ['X-API-Key'],
        properties: {
          'X-API-Key': {
            type: 'string'
          }
        }
      },
      headers: {
        type: 'object',
        required: ['authorization', 'X-API-Key'],
        properties: {
          authorization: {
            type: 'string'
          },
          'X-API-Key': {
            type: 'string'
          }
        }
      }
    }
  })
})
