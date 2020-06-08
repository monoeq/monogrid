import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const config = {
  input: 'index.js',
  output: [
    {
      file: 'dist/monogrid.js',
      format: 'iife',
      name: 'Monogrid'
    },
    {
      file: 'dist/monogrid.min.js',
      format: 'iife',
      name: 'Monogrid',
      plugins: [uglify()]
    }
  ],
  plugins: [
    babel({ presets: ['@babel/preset-env'] })
  ]
}

export default config