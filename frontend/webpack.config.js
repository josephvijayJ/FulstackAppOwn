// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
import { NodePolyfillPlugin } from 'node-polyfill-webpack-plugin';
module.exports = {
  // Other rules like entry, output, devserver....,
  plugins: [new NodePolyfillPlugin()],
};
