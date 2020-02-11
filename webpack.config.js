const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const nodeExternals = require('webpack-node-externals');

const server  = {
  target: 'node',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: {
    server: './src/server/index.ts',
    jimaku_server_test: './src/test/jimaku_server_test.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
  entry: './src/client/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
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

module.exports = [server, client]

