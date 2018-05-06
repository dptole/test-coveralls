'use strict'

const should = require('should')
const app = require('../../')

describe('Sum', function() {
  it('should sum 2 + 3 === 5', function() {
    should.strictEqual(
      app.sum(2, 3),
      5
    )
  })

  it('should sum 12 + 3 === 6', function() {
    should.strictEqual(
      app.sum(12, 3),
      6
    )
  })

  it('should sum 0 + 5 === 5', function() {
    should.strictEqual(
      app.sum(0, 5),
      5
    )
  })
})
