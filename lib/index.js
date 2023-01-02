const plugin = require('./plugin')

const metadata = {
  fastify: '4.x',
  name: 'oas-fastify'
}

module.exports = require('fastify-plugin')(plugin, metadata)
