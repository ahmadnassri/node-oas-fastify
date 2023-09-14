const test = require('node:test')
const assert = require('node:assert')

const convert = require('../lib/helpers/convert-path')

test('convert paths', () => {
  assert.equal(convert('/pets/{petId}'), '/pets/:petId')
  assert.equal(convert('/{entity}/{id}'), '/:entity/:id')
})
