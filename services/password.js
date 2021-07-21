'use strict'
const crypto = require('crypto')

const setPassword = function (password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
  return {
    hash: hash,
    salt: salt,
  }
}
const validPassword = function (password, salt, hashPassword) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`)
  return hashPassword === hash
}

module.exports = {
  setPassword,
  validPassword,
}
