// Imports
const ParseString = require('xml2js').parseString

// Declare internals
const internals = {}

/**
 * Convert a given data into json.
 * @param data xml data that comes from the request
 * @returns {Promise<*>}
 */
internals.converter = async (data) => {
  return new Promise((resolve, reject) => {
    ParseString(data, function (err, json) {
      if (err) {
        reject({ name: 'JsonConversionError' })
      }
      else {
        resolve(json)
      }
    })
  })
}

module.exports = internals.converter
