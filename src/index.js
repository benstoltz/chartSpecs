import { version } from '../package.json'
import { esriToVega } from './generateSpec/esriToVega'
import { esriToAM } from './generateSpec/esriToAM'
import { renderVega, embedVega } from './render/renderVega'
import { renderAm } from './render/renderAM'

const cedar = function() {
  const state = {}
  this.version = version

  // state.type = this.type
  // this.esriSpec = this.spec
  if (this.spec) {
    this.vgSpec = esriToVega(this.spec)
    this.amSpec = esriToAM(this.spec)
  }


  return Object.assign(this, {
    show (el) {
      renderVega(this.vgSpec, el)
    },

    showAm(el) {
      renderAm(this.amSpec, el)
    },

    embed(el) {
      embedVega(this.vgSpec, el)
    },

    dataset (val) {
      state.dataset = val
    },

    get () {
      console.log(this)
    }
  }, {})
}

const Cedar = (target) => cedar.call(target)

export default Cedar
