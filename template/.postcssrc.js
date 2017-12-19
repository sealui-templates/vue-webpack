var saladConfig = require('./public/salad.config.json');
const postcssConfig = {
  plugins: [
    //require('autoprefixer')(),
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css','less']
    }),
    require('postcss-salad')(saladConfig)
  ]
}

module.exports = postcssConfig;
