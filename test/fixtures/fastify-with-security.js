module.exports = [
  {
    method: 'GET',
    url: '/pets',
    schema: {
      params: {
        type: 'object',
        required: [],
        properties: {}
      },
      query: {
        type: 'object',
        required: [],
        properties: {
          limit: {
            type: 'integer',
            format: 'int32'
          }
        }
      },
      headers: {
        type: 'object',
        required: [
          'header-key'
        ],
        properties: {
          'header-key': {
            type: 'string'
          }
        }
      },
      response: {
        200: {
          $ref: '#/components/schemas/Pets'
        }
      }
    }
  },
  {
    method: 'POST',
    url: '/pets',
    schema: {
      params: {
        type: 'object',
        required: [],
        properties: {}
      },
      query: {
        type: 'object',
        required: [],
        properties: {}
      },
      headers: {
        type: 'object',
        required: [
          'X-API-SECRET',
          'authorization',
          'content-type'
        ],
        properties: {
          'X-API-SECRET': {
            type: 'string'
          },
          authorization: {
            type: 'string'
          },
          'content-type': {
            const: 'application/x-www-form-urlencoded'
          }
        }
      },
      response: {},
      body: {
        type: 'object',
        required: [
          'email',
          'username',
          'password'
        ],
        properties: {
          email: {
            type: 'string',
            format: 'email'
          },
          username: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      }
    }
  },
  {
    method: 'GET',
    url: '/pets/:petId',
    schema: {
      params: {
        type: 'object',
        required: [
          'petId'
        ],
        properties: {
          petId: {
            type: 'string'
          }
        }
      },
      query: {
        type: 'object',
        required: [
          'query-key'
        ],
        properties: {
          'query-key': {
            type: 'string'
          }
        }
      },
      headers: {
        type: 'object',
        required: [
          'authorization',
          'header-key'
        ],
        properties: {
          authorization: {
            type: 'string'
          },
          'header-key': {
            type: 'string'
          }
        }
      },
      response: {
        200: {
          $ref: '#/components/schemas/Pet'
        }
      }
    }
  }
]
