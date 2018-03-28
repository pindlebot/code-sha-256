const fs = require('fs')
const crypto = require('crypto')
const AWS = require('aws-sdk')

function compareFunctionCode (artifactFilePath, { params, config }) {
  AWS.config.update(config)
  const lambda = new AWS.Lambda()
  return lambda.getFunctionConfiguration(params)
    .promise()
    .then(({ CodeSha256 }) => {
      const data = fs.readFileSync(artifactFilePath)
      const localHash = crypto.createHash('sha256').update(data).digest('base64')
      return localHash !== CodeSha256
    })
}

module.exports = compareFunctionCode
