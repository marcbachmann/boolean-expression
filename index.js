var allOperators = /(!|&&| AND | OR | NOT |\|\||\(|\)| )/g

module.exports = booleanExpression

function booleanExpression (exp) {
  exp = exp.split(allOperators).filter(Boolean).reduce(rewrite, [])
  return function toString (map) {
    return exp.map(function (t, i, exp) {
      if (t.type === 'operator') return t.value
      return (map || expressionToString)(t.value, i)
    }).join(' ')
  }
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
