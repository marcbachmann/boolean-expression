# boolean-expression

Create a boolean expression that's safe to eval

## expression = booleanExpression(exp)

Returns a `BooleanExpression` instance with `toString` and `toTokens` methods.

### expression.toString(map)

```
var expression = booleanExpression('foo AND bar')
var str = expression.toString(function (token) {
    return 'val.indexOf(' + JSON.stringify(token) + ')'
})

// str == 'val.indexOf("foo") && val.indexOf("bar")'

```


### expression.toTokens()

```
var expression = booleanExpression('foo && bar && !qux')
expression.toTokens()
// returns ['foo', 'bar', 'qux']
```
