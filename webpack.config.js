const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'geomath.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'geomath',
      type: 'umd',
    },
    globalObject: 'this'
  },
};