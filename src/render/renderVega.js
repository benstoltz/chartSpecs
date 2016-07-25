import vg from 'vega'

export function renderVega(spec, el) {
  vg.parse.spec(spec, (error, chart) => {
    chart(({el})).update()
  })
}
