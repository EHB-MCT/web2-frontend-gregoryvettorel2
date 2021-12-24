const path = require('path');
module.exports = {
    entry: {
      index: './src/index.js',
      searchScript: './src/search.js',
      portfolio: './src/portfolio.js',
      myList: './src/myList.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/docs',
    },  mode: 'development'
};