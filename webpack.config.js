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
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'aviation-math.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'aviation-math',
      type: 'umd',
    },
    globalObject: 'this'
  },
};