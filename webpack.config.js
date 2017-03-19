const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: __dirname,

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'disco-ui-[hash:7].js'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      __dirname
    ]
  },

  resolveLoader: {
    modules: [
      path.resolve(__dirname, './node_modules')
    ]
  },

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015', { 'modules': false } ],
            [ 'react' ]
          ]
        }
      },
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: __dirname
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({ browsers: ['last 2 versions'] })
                ]
              }
            }
          ]
        })
      },
      // static assets
      {
        test: /\.(ttf|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: getPlugins(),

  devtool: 'source-map'
};

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      __API_HOST__: JSON.stringify(getApiHost()),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ];

  if (isProduction()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
        sourceMap: true
      })
    );
  }

  plugins.push(
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin('style-[hash:7].css')
  );

  return plugins;
}

function getApiHost() {
  if (isProduction()) {
    return `http://${env('DISCOBOX_SERVER_HOST')}:${env('DISCOBOX_SERVER_PORT')}`;
  } else {
    return 'http://discobox:9500';
  }
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function env(ENV_VAR) {
  return process.env[ENV_VAR];
}
