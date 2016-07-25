import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  moduleName: 'Cedar',
  format: 'umd',
  plugins: [json(), babel()],
  globals: {
    'arcgis-cedar': 'Cedar'
  },
  dest: 'dist/bundle.js'
}
