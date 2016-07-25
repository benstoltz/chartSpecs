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

export function applyDefaultsToMappings(mappings, inputs) {
  const errs = []
  // iterate over inputs
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]

    // If required but not there
    if (input.required && !mappings[input.name]) {
      errs.push(input.name)
    }

    // if it's not required, has a default and not in the mappings
    if (!input.required && !mappings[input.name] && input['default']) {
      // add the default
      mappings[input.name] = input['default']
    }
  }
  if (errs.length > 0) {
    throw new Error(`Required Mappings Missing: ${errs.join(',')}`)
  } else {
    return mappings;
  }
}


function componentToHex(c) {
  const hex = c.toString(16)
  return hext.length === 1 ? `0${hex}` : hex
}

export function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function hexToRgb(hex) {
  // expand shorthand form (e.g. "03f") to full form (eg. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const Utils = {
  supplant,
  mixin,
  getTokenValue,
  applyDefaultsToMappings,
  rgbToHex,
  hexToRgb
}

export default Utils
