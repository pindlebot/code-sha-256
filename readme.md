## code-sha-256

Compare local to remote sha-256 (for use with AWS Lambda). The use-case it to determine if you should update a function because the function's code has changed.

### Example

```js

const compareFunctionCode = require('code-sha-256')
const config = { region: 'us-east-1' }
const params = { 
  FunctionName: 'kitApiLambdaEdge',
  Qualifier: '1' // optional, default is $LATEST
}

compareFunctionCode('index.js', { params, config }).then(shouldUpdate => {
  if (shouldUpdate) {
    // update function code
  } else {
    // proceed
  }
})
