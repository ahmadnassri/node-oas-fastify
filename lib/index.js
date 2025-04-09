const fp = require('fastify-plugin')

const plugin = require('./plugin')

module.exports = fp(plugin, {
  fastify: '5.x',
  name: 'oas-fastify'
})
