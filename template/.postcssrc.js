var saladConfig = require('./public/salad.config.json');
const postcssConfig = {
  plugins: [
    require("postcss-import")({

    }),
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['css','less']
    }),
    require('postcss-salad')(saladConfig){{#isMobile}},
    require('postcss-px2rem')({
      remUnit:100,
      remPrecision: 5
    }){{/isMobile}}
  ]
}

module.exports = postcssConfig;
