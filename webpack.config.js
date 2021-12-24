const path = require('path');
module.exports = {
    entry: {
      searchScript: './src/search.js',
      index: './src/index.js',
      portfolio: './src/portfolio.js',
      myList: './src/myList.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/docs',
    },  mode: 'development'
};