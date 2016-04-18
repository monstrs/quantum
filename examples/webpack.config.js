import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import babelPlugin from '../src/babel'
import webpackLoader from '../src/webpack'

export const entry = [
  'webpack-hot-middleware/client',
  __dirname,
]

export const output = {
  filename: 'index.js',
}

export const module = {
  loaders: [
    {
      test: /\.js?$/,
      loader: webpackLoader,
      exclude: /node_modules/,
    },
    {
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        babelrc: false,
        presets: [
          'es2015',
          'stage-0',
          'react',
        ],
        plugins: [
          babelPlugin,
        ],
      },
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css',
      ],
    },
  ],
}

export const resolve = {
  alias: {
    'quantum': path.resolve(__dirname, '..', 'src'),
  },
}

export const plugins = [
  new HtmlWebpackPlugin({}),
  new webpack.HotModuleReplacementPlugin(),
]
