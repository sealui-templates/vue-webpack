{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
{{#nprogress}}
import NProgress from 'nprogress'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import 'nprogress/nprogress.css'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/nprogress}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#isMobile}}
var FastClick = require('fastclick');
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
{{/isMobile}}
{{#nprogress}}
router.beforeEach((route, redirect, next) => {
  NProgress.start(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  next(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

router.afterEach(route => {
  NProgress.done(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/nprogress}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
