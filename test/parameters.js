const test = require('node:test')
const assert = require('node:assert')

const parameters = require('../lib/helpers/parameters')

const defaultSchema = {
  type: 'object',
  required: [],
  properties: {}
}

test('params: only accept arrays', () => {
  assert.equal(typeof parameters({}, 'query'), 'object')
  assert.equal(typeof parameters(null, 'query'), 'object')
  assert.equal(typeof parameters(undefined, 'query'), 'object')
})

test('params: convert to schema', () => {
  const fixture = [{
    name: 'foo',
    in: 'query',
    description: 'foobar',
    required: false,
    schema: {
      type: 'integer'
    }
  }]

  assert.deepEqual(parameters(fixture, 'path'), defaultSchema)
  assert.deepEqual(parameters(fixture, 'query'), {
    type: 'object',
    required: [],
    properties: {
      foo: {
        type: 'integer'
      }
    }
  })
})

test('params: convert to schema', () => {
  const fixture = [{
    name: 'foo',
    in: 'path',
    description: 'foobar',
    required: true,
    schema: {
      type: 'string'
    }
  }]

  assert.deepEqual(parameters(fixture, 'path'), {
    type: 'object',
    required: ['foo'],
    properties: {
      foo: {
        type: 'string'
      }
    }
  })
})
