const convert = require('../lib/convert-path')
const { test } = require('tap')

test('convert paths', assert => {
  assert.plan(2)

  assert.equal(convert('/pets/{petId}'), '/pets/:petId')
  assert.equal(convert('/{entity}/{id}'), '/:entity/:id')
})
