import { version } from '../package.json'
import Utils from './helpers/utils'

const cedar = function() {
  const spec = {}

  return Object.assign(this, {
    set (name, value) {
      spec[name] = value
    }
  }, {})
}
