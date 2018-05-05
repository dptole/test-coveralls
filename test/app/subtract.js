'use strict'

const should = require('should')
const app = require('../../')

describe('Subtraction', function() {
  it('should subtract 2 - 3 === -1', function() {
    should.strictEqual(
      app.subtract(2, 3),
      -1
    )
  })

  it('should subtract 0 - 5 === -5', function() {
    should.strictEqual(
      app.subtract(0, 5),
      -5
    )
  })
})
