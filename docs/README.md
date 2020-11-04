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

#### Yaml Support?

<details>
  <summary>This package does not support OAS Yaml format, but you can easily convert to JSON before calling `oas-fastify`</summary>

  ###### using [`js-yaml`](https://www.npmjs.com/package/js-yaml)

  ```js
  const yaml = require('js-yaml')
  const fs   = require('fs')
  
  const spec = yaml.safeLoad(fs.readFileSync('openapi.yml', 'utf8'))


  fastify.register(require('oas-fastify'), { spec, handler }) 
  ```

  ###### using [`apidevtools/swagger-cli`](https://www.npmjs.com/package/@apidevtools/swagger-cli)
  
  ```bash
  npx apidevtools/swagger-cli bundle spec/openapi.yml --outfile spec.json
  ```
</details>

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
