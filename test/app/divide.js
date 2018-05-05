'use strict'

const should = require('should')
const app = require('../../')

describe('Division', function() {
  it('should divide 2 / 4 === 0.5', function() {
    should.strictEqual(
      app.divide(2, 4),
      0.5
    )
  })

  it('should divide 1 / 5 === 0.2', function() {
    should.strictEqual(
      app.divide(1, 5),
      0.2
    )
  })
})
