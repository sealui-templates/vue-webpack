var saladConfig = require('./public/salad.config.json');
const postcssConfig = {
  plugins: [
    require("postcss-import")({

    }),
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['css','less']
    }),
    require('postcss-salad')(saladConfig)
  ]
}

module.exports = postcssConfig;
