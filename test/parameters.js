const { test } = require('tap')

const parameters = require('../lib/helpers/parameters')

test('params: only accept arrays', assert => {
  assert.plan(3)

  assert.type(parameters({}, 'query'), undefined)
  assert.type(parameters(null, 'query'), undefined)
  assert.type(parameters(undefined, 'query'), undefined)
})

test('params: convert to schema', assert => {
  assert.plan(2)

  const fixture = [{
    name: 'foo',
    in: 'query',
    description: 'foobar',
    required: false,
    schema: {
      type: 'integer'
    }
  }]

  assert.strictSame(parameters(fixture, 'path'), undefined)
  assert.strictSame(parameters(fixture, 'query'), {
    type: 'object',
    required: [],
    properties: {
      foo: {
        type: 'integer'
      }
    }
  })
})

test('params: convert to schema', assert => {
  assert.plan(1)

  const fixture = [{
    name: 'foo',
    in: 'path',
    description: 'foobar',
    required: true,
    schema: {
      type: 'string'
    }
  }]

  assert.strictSame(parameters(fixture, 'path'), {
    type: 'object',
    required: ['foo'],
    properties: {
      foo: {
        type: 'string'
      }
    }
  })
})
