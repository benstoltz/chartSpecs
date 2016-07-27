import vg from 'vega'
// import vl from 'vega-lite'
// // import vega-embed from 'vega-embed'

export function embedVL(spec, el) {
  const embedSpec = {
    mode: "vega-lite",
    spec: spec
  }

  vg.embed(el, embedSpec, function(error, result){
    console.log(`VL result is:`, result)
    if (error) {
      console.log('warning error: ', error)
    }
  })
}
