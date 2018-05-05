'use strict'

const app = {
  sum: (a, b) => {
    if(a > 10)
      a = b
    return a + b
  },

  subtract: (a, b) => {
    if(a < 0)
      a = b + 2
    return a - b
  },

  multiply: (a, b) => {
    if(Number.isNaN(a))
      a = 0
    return a * b
  },

  divide: (a, b) => {
    if(b === 0)
      throw new Error('Thou shalt not divide by zero!')
    return a / b
  }
}

module.exports = app
