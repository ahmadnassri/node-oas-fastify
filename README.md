# OAS to Fastify Plugin

OAS 3.x to Fastify routes automation

[![license][license-img]][license-url]
[![version][npm-img]][npm-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![release][release-img]][release-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-oas-fastify

[npm-url]: https://www.npmjs.com/package/oas-fastify
[npm-img]: https://badgen.net/npm/v/oas-fastify

[super-linter-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-oas-fastify/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-oas-fastify/workflows/test/badge.svg

[release-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/node-oas-fastify/workflows/release/badge.svg

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
