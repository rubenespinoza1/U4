
const crypto = require("crypto");

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

module.exports = {
  randomTokenString
};