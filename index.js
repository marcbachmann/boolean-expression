var allOperators = /(!|&&| AND | OR | NOT |\|\||\(|\)| )/g

module.exports = function parseBooleanExpression (exp) {
  return new BooleanExpression(exp)
}

function BooleanExpression (str) {
  this._parsed = str.split(allOperators).filter(Boolean).reduce(rewrite, [])
}

BooleanExpression.prototype.toString = function toString (map) {
  return this._parsed.map(function (t, i, exp) {
    if (t.type === 'operator') return t.value
    return (map || expressionToString)(t.value, i)
  }).join(' ')
}

BooleanExpression.prototype.toTokens = function toTokens () {
  return this._parsed
  .map(function (e) { return e.type === 'token' ? e.value : undefined })
  .filter(Boolean)
}

var nativeOperators = /^(!|&&|\|\||\(|\))$/
var operatorMap = {OR: '||', AND: '&&', NOT: '!'}
function rewrite (ex, el, i, all) {
  var t = el.trim()
  if (!t) return ex
  if (operatorMap[t]) t = operatorMap[t]
  if (nativeOperators.test(t)) ex.push({type: 'operator', value: t})
  else ex.push({type: 'token', value: t.replace(/['\\]/g, '\\$&')})
  return ex
}

function expressionToString (token) {
  return token
}
