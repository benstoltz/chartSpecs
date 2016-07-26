import { version } from '../package.json'
import {parseEsriSpec} from './generateSpec/esriToVega'
import { renderVega, embedVega } from './render/renderVega'

const cedar = function() {
  const state = {}
  this.version = version

  // state.type = this.type
  // this.esriSpec = this.spec
  if (this.spec) {
    this.vgSpec = parseEsriSpec(this.spec)
  }

  console.log(`The state is: `, state)

  return Object.assign(this, {
    show (el) {
      console.log(this.vgSpec)
      renderVega(this.vgSpec, el)
    },

    embed(el) {
      embedVega(this.vgSpec, el)
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
