/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CssResolvePlugin from '../webpack/css-resolve-plugin'

export const output = {
  path: '/',
}

export const module = {
  loaders: [
    {
      test: /\.js?$/,
      loader: path.resolve(__dirname, '../webpack/loader'),
      exclude: /node_modules/,
    },
    {
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        babelrc: true,
      },
    },
    {
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        notExtractLoader: 'style-loader',
        loader: 'css-loader!postcss-loader',
      }),
    },
  ],
}

export const plugins = [
  new CssResolvePlugin(),
  new ExtractTextPlugin('index.css'),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            '>2%',
            'last 2 versions',
          ],
        }),
      ],
    },
  }),
]
