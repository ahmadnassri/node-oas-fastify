const fp = require('fastify-plugin')

const plugin = require('./plugin')

module.exports = fp(plugin, {
  fastify: '4.x',
  name: 'oas-fastify'
})
