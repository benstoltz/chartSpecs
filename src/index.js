import { version } from '../package.json'
import { esriToVega } from './generateSpec/esriToVega'
import { buildQuery } from './query/query'
import { esriToAM } from './generateSpec/esriToAM'
import { esriToVL } from './generateSpec/esriToVL'
import { renderVega, embedVega } from './render/renderVega'
import { renderAm } from './render/renderAM'
import { embedVL } from './render/renderVL'
import vg from 'vega'

const dl = vg.util

const cedar = function() {
  const state = {}
  this.version = version

  if (this.spec) {
    this.datasource = this.spec.dataSource
    this.query = buildQuery(this.datasource, this.spec.series[0].query)
    this.data = dl.json(this.query)
    this.stats = dl.summary(this.data.features.map((attr) => { return attr.attributes }))

    this.vgSpec = esriToVega(this.spec, this.data)
    this.amSpec = esriToAM(this.spec, this.data)
    this.vlSpec = esriToVL(this.spec, this.data)
  }


  return Object.assign(this, {
    show (el) {
      renderVega(this.vgSpec, el)
    },

    showAm(el) {
      renderAm(this.amSpec, el)
    },

    showVL(el) {
      embedVL(this.vlSpec, el)
    },

    embed(el) {
      embedVega(this.vgSpec, el)
    },

    dataset (val) {
      state.dataset = val
    },

    get () {
      console.log(this.vgSpec)
    }
  }, {})
}

const Cedar = (target) => cedar.call(target)

export default Cedar
