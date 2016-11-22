# boolean-expression

Create a boolean expression that's safe to eval

```
var booleanExpression = require('boolean-expression')
var expression = booleanExpression('foo AND bar')
var str = expression(function (condition) {
    return 'val.indexOf(' + JSON.stringify(condition) + ')'
})

// str == 'val.indexOf("foo") && val.indexOf("bar")'
```


This module is currently tested and in use in https://www.npmjs.com/package/validate-scope
