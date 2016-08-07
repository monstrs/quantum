import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import babelPlugin from '../src/babel'
import webpackLoader from '../src/webpack'
import CssResolvePlugin from '../src/webpack/css-resolve-plugin'

export const entry = [
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
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
          [babelPlugin, {
            'rootPath': './examples',
          }],
          'react-hot-loader/babel',
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
  new CssResolvePlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({}),
]
