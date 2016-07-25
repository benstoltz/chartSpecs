import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/chartSpec.js',
  format: 'umd',
  plugins: [json(), babel()],
  dest: 'dist/bundle.js'
}
