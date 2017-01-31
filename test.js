var assert = require('assert')
var booleanExpression = require('./')

function identity (i) { return i }
function indexOf (condition) { return '~val.indexOf(' + JSON.stringify(condition) + ')' }

var simple = booleanExpression('foo && bar')
var simpleNegotiation = booleanExpression('foo && !bar')
var simpleWordyNegotiation = booleanExpression('foo AND NOT bar')
var complex = booleanExpression('foo && NOT(a AND !b)')

// Uses an identity method as defaut map method
assert.equal(simple(), 'foo && bar')
assert.equal(simple(identity), 'foo && bar')

assert.equal(simpleNegotiation(), 'foo && ! bar')
assert.equal(simpleNegotiation(identity), 'foo && ! bar')
assert.equal(simpleWordyNegotiation(), 'foo && ! bar')
assert.equal(simpleWordyNegotiation(identity), 'foo && ! bar')

assert.equal(complex(), 'foo && ! ( a && ! b )')
assert.equal(complex(identity), 'foo && ! ( a && ! b )')

// Works with a custom map method
assert.equal(simple(indexOf), '~val.indexOf("foo") && ~val.indexOf("bar")')
assert.equal(simpleNegotiation(indexOf), '~val.indexOf("foo") && ! ~val.indexOf("bar")')
assert.equal(simpleWordyNegotiation(indexOf), '~val.indexOf("foo") && ! ~val.indexOf("bar")')
assert.equal(
  complex(indexOf),
  '~val.indexOf("foo") && ! ( ~val.indexOf("a") && ! ~val.indexOf("b") )'
)

var spacesAreNotSupported = booleanExpression(`"foo bar" && NOT(test AND !b)`)
spacesAreNotSupported(function (e, i) {
  // The second argument represents the index of the token within the expression
  if (i === 0) assert.equal(e, '"foo')
  else if (i === 1) assert.equal(e, 'bar"')
  else if (i === 5) assert.equal(e, 'test')
  else if (i === 8) assert.equal(e, 'b')
  else assert.fail('Map method called for other thing than token', e)
})

