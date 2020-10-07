## Usage

```js
const fastify = require('fastify')()
const spec = require('./petstore.json')

// your handler object properties map to the OAS "operationId"
const handler = {
  listPets: () => { ... }
  createPets: () => { ... }
  showPetById: () => { ... }
}

fastify.register(require('oas-fastify'), { spec, handler }) 
```

### Options

The plugin accepts an `options` object with the following properties:

- **`spec`**: a valid [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/) **JSON** object
- **`handler`**: an object with properties that map to the spec's `operationId` names, with the values as functions that will handle the request

###### Example

```js
const spec = {
  "paths": {
    "/pets": {
      "get": {
        "operationId": "listPets",
        ...
      }
    }
  }
}

const handler = {
  listPets: function (request, reply, fastify) {
    // fastify instance passed in for convenience

    reply.send({ hello: 'world' })
  }
}
```
