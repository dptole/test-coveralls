'use strict'

const should = require('should')
const app = require('../../')

describe('Multiplication', function() {
  it('should multiply 2 * 3 === 6', function() {
    should.strictEqual(
      app.multiply(2, 3),
      6
    )
  })

  it('should multiply "x" * 3 === 0', function() {
    should.strictEqual(
      app.multiply('x', 3),
      0
    )
  })

  it('should multiply 0 * 5 === 0', function() {
    should.strictEqual(
      app.multiply(0, 5),
      0
    )
  })
})
