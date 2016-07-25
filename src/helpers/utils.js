export function supplant(template, params) {
  const t = template.replace(/{([^{}]*)}/g,
    (a, b) => {
      const r = getTokenValue(params, b);

      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  )
  return t.replace(/"{([^{}]*)}"/g,
    (a, b) => {
      let r = getTokenValue(params, b);
      return r.constructor === Array ? r = JSON.stringify(r) : a;
    })
}

/**
 * merges n objects
 *
 * @param {object} - empty object that input objects will be merged into
 *
 * @returns {object} - merged object
 */
export function mixin(source) {
  const args = [...arguments]
  for (let i = 1; i < args.length; i++) {
    for ( const key of Object.keys(args[i])) {
      source[key] = args[i][key]
    }
  }
  return source
}

export function getTokenValue(tokens, tokenName) {
  let tempTokens = tokens
  const tokenNameParts = tokenName.split('.')
  for (let key in tokenNameParts) {
    if (tempTokens.hasOwnProperty(tokenNameParts[key])) {
      tempTokens = tempTokens[tokenNameParts[key]]
    } else {
      return null
    }
  }
  return tempTokens
}


const Utils = {
  supplant,
  mixin,
  getTokenValue
}

export default Utils
