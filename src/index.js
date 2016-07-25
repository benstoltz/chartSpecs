import { version } from '../package.json'
import {parseEsriSpec} from './generateSpec/esriToVega'
import { renderVega } from './render/renderVega'
import barSpec from './specs/bar.json'

const cedar = function() {
  const state = {}
  this.version = version

  // state.type = this.type
  // this.esriSpec = this.spec
  this.vgSpec = parseEsriSpec(this.spec, barSpec)

  console.log(`The state is: ${state}`)

  return Object.assign(this, {
    show (el) {
      renderVega(this.vgSpec, el)
    },

    dataset (val) {
      state.dataset = val
    },

    get () {
      console.log(state)
    }
  }, {})
}

const Cedar = (target) => cedar.call(target)

export default Cedar
