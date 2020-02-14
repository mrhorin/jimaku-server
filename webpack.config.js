const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const nodeExternals = require('webpack-node-externals');

const server  = {
  target: 'node',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: {
    'main': './src/server/index.ts',
    'jimaku_server_test': './src/test/jimaku_server_test.ts',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};

const client  = {
  target: 'web',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/client/client.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'client.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};

const bin  = {
  target: 'node',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/server/server.ts',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = [server, client, bin]
