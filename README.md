# OAS to Fastify Plugin

OAS 3.x to Fastify routes automation

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![semantic][semantic-img]][semantic-url]

## Usage

``` js
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

``` js
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

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-oas-fastify

[release-url]: https://github.com/ahmadnassri/node-oas-fastify/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-oas-fastify

[super-linter-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-oas-fastify/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-oas-fastify/workflows/test/badge.svg

[semantic-url]: https://github.com/ahmadnassri/node-oas-fastify/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
