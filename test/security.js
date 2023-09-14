const test = require('node:test')
const assert = require('node:assert')

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
test('security: only accept arrays', () => {
  assert.ok(!security(null, {}, []))
  assert.ok(!security(null, undefined, []))
  assert.ok(!security(null, undefined, {}))
})

test('security: type=http ', () => {
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

  assert.deepEqual(fastifyRoute, {
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

test('security: type=apiKey in=header ', () => {
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

  assert.deepEqual(fastifyRoute, {
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

test('security: type=apiKey in=query ', () => {
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

  assert.deepEqual(fastifyRoute, {
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

test('security: type=apiKey in=cookie ', () => {
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

  assert.deepEqual(fastifyRoute, {
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

test('security: ignore missing security types', () => {
  const fastifyRoute = {
    schema: {
      query: {},
      headers: {}
    }
  }

  security(fastifyRoute, securitySchemes, [{ Header: {}, Missing: {} }])

  assert.deepEqual(fastifyRoute, {
    schema: {
      query: {},
      headers: {}
    }
  })
})

test('security: multiple ', () => {
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

  assert.deepEqual(fastifyRoute, {
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
