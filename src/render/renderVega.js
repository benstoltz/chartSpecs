import vg from 'vega'

export function renderVega(spec, el) {
  vg.parse.spec(spec, (error, chart) => {
    chart(({el})).update()
  })
}

export function embedVega(spec, el) {
  vg.embed(el, spec, (error, result) => {
    console.log(`Result is: ${result}`)
  })
}
