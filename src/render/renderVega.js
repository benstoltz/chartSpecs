import vg from 'vega'

export function renderVega(spec, el) {
  vg.parse.spec(spec, (error, result) => {
    const view = result({el}).update()
    console.log('the view is: ', result)
    vg.tooltip(view)
  })
}

export function embedVega(spec, el) {
  vg.embed(el, spec, (error, result) => {
    console.log(`Result is: ${result}`)
  })
}
