const { test } = require('tap')

const security = require('../lib/helpers/security')

test('security: only accept arrays', assert => {
  assert.plan(3)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  assert.type(security(defaultSchema, 'header', {}, []), Object)
  assert.type(security(defaultSchema, 'header', undefined, []), Object)
  assert.type(security(defaultSchema, 'header', undefined, {}), Object)
})

test('security: only accept header and query type', assert => {
  assert.plan(2)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  const securitySchemes = {
    Header: {
      type: 'http'
    }
  }
  const methodSecurity = [
    { Header: {} }
  ]

  assert.type(security(defaultSchema, 'path', securitySchemes, methodSecurity), Object)
  assert.strictSame(security(defaultSchema, 'path', securitySchemes, methodSecurity), defaultSchema)
})

test('security: convert to schema header for http', assert => {
  assert.plan(2)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  const securitySchemes = {
    Header: {
      type: 'http'
    }
  }
  const methodSecurity = [
    { Header: {} }
  ]

  assert.strictSame(security(defaultSchema, 'query', securitySchemes, methodSecurity), defaultSchema)
  assert.strictSame(security(defaultSchema, 'header', securitySchemes, methodSecurity), {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: {
        type: 'string'
      }
    }
  })
})

test('security: convert to schema header for apiKey', assert => {
  assert.plan(2)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  const securitySchemes = {
    Header: {
      type: 'apiKey',
      in: 'header',
      name: 'HEADER-API-KEY'
    }
  }
  const methodSecurity = [
    { Header: {} }
  ]

  assert.strictSame(security(defaultSchema, 'query', securitySchemes, methodSecurity), defaultSchema)
  assert.strictSame(security(defaultSchema, 'header', securitySchemes, methodSecurity), {
    type: 'object',
    required: ['header-api-key'],
    properties: {
      'header-api-key': {
        type: 'string'
      }
    }
  })
})

test('security: convert to schema query for apiKey', assert => {
  assert.plan(2)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  const securitySchemes = {
    Header: {
      type: 'apiKey',
      in: 'query',
      name: 'HEADER-API-KEY'
    }
  }
  const methodSecurity = [
    { Header: {} }
  ]

  assert.strictSame(security(defaultSchema, 'header', securitySchemes, methodSecurity), defaultSchema)
  assert.strictSame(security(defaultSchema, 'query', securitySchemes, methodSecurity), {
    type: 'object',
    required: ['header-api-key'],
    properties: {
      'header-api-key': {
        type: 'string'
      }
    }
  })
})

test('security: ignore missing security types', assert => {
  assert.plan(1)

  const defaultSchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  const securitySchemes = {
    Header: {
      type: 'apiKey',
      in: 'query',
      name: 'HEADER-API-KEY'
    }
  }
  const methodSecurity = [
    { Header: {}, Missing: {} }
  ]

  assert.strictSame(security(defaultSchema, 'query', securitySchemes, methodSecurity), {
    type: 'object',
    required: ['header-api-key'],
    properties: {
      'header-api-key': {
        type: 'string'
      }
    }
  })
})
