const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const nodeExternals = require('webpack-node-externals');

const server  = {
  target: 'node',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts'],
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
  entry: './src/client/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts'],
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

module.exports = [server, client]

