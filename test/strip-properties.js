const { test } = require('tap')
const stripProperties = require('../lib/helpers/strip-properties')

test('stripProperties: should return standard object', assert => {
  assert.plan(2)

  const simpleSchema = {
    type: 'object',
    required: [
      'bar'
    ],
    properties: {
      bar: {
        type: 'string'
      }
    }
  }

  assert.same(stripProperties(simpleSchema), {
    type: 'object',
    required: [
      'bar'
    ],
    properties: {
      bar: {
        type: 'string'
      }
    }
  })

  const emptySchema = {
    type: 'object',
    required: [],
    properties: {}
  }

  assert.same(stripProperties(emptySchema), {
    type: 'object'
  })
})

test('stripProperties: should return itself', assert => {
  assert.plan(2)

  assert.type(stripProperties({}), Object)
  assert.same(stripProperties({}), {})
})

test('stripProperties: strip out example', assert => {
  assert.plan(4)

  const asserts = [
    {
      input: {
        type: 'object',
        properties: {
          pagination: {
            type: 'object',
            default: {
              page: 1,
              per_page: 1000
            },
            properties: {
              page: {
                type: 'integer',
                description: 'The current page number',
                minimum: 1,
                default: 1,
                example: 1
              },
              per_page: {
                type: 'integer',
                description: 'The number of items per page',
                default: 100,
                minimum: 1,
                maximum: 1000,
                example: 10
              }
            }
          },
          entity_ids: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'string',
              format: 'uuid',
              description: 'the entity id',
              example: 'e7a54edf-87ef-4916-8487-0dcaa03ba796',
              readOnly: true
            }
          }
        }
      },
      output: {
        type: 'object',
        properties: {
          pagination: {
            type: 'object',
            default: {
              page: 1,
              per_page: 1000
            },
            properties: {
              page: {
                type: 'integer',
                description: 'The current page number',
                minimum: 1,
                default: 1
              },
              per_page: {
                type: 'integer',
                description: 'The number of items per page',
                default: 100,
                minimum: 1,
                maximum: 1000
              }
            }
          },
          entity_ids: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'string',
              format: 'uuid',
              description: 'the entity id',
              readOnly: true
            }
          }
        }
      }
    },
    {
      input: {
        type: 'integer',
        description: 'The current page number',
        minimum: 1,
        default: 1,
        example: 1
      },
      output: {
        type: 'integer',
        description: 'The current page number',
        minimum: 1,
        default: 1
      }
    },
    {
      input: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          format: 'uuid',
          description: 'the entity id',
          example: 'e7a54edf-87ef-4916-8487-0dcaa03ba796',
          readOnly: true
        }
      },
      output: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          format: 'uuid',
          description: 'the entity id',
          readOnly: true
        }
      }
    },
    {
      input: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            pagination: {
              type: 'object',
              default: {
                page: 1,
                per_page: 1000
              },
              properties: {
                page: {
                  type: 'integer',
                  description: 'The current page number',
                  minimum: 1,
                  default: 1,
                  example: 1
                },
                per_page: {
                  type: 'integer',
                  description: 'The number of items per page',
                  default: 100,
                  minimum: 1,
                  maximum: 1000,
                  example: 10
                }
              }
            },
            entity_ids: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'string',
                format: 'uuid',
                description: 'the entity id',
                example: 'e7a54edf-87ef-4916-8487-0dcaa03ba796',
                readOnly: true
              }
            }
          }
        }
      },
      output: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            pagination: {
              type: 'object',
              default: {
                page: 1,
                per_page: 1000
              },
              properties: {
                page: {
                  type: 'integer',
                  description: 'The current page number',
                  minimum: 1,
                  default: 1
                },
                per_page: {
                  type: 'integer',
                  description: 'The number of items per page',
                  default: 100,
                  minimum: 1,
                  maximum: 1000
                }
              }
            },
            entity_ids: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'string',
                format: 'uuid',
                description: 'the entity id',
                readOnly: true
              }
            }
          }
        }
      }
    }
  ]

  asserts.forEach(({ input, output }) => {
    assert.same(stripProperties(input), output)
  })
})
