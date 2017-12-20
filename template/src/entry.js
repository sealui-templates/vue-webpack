{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
{{#nprogress}}
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
{{/nprogress}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#request}}
import request from 'plugins/request'
Vue.use(request)
{{/request}}

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
  NProgress.start()
  next()
})

router.afterEach(route => {
  NProgress.done()
})
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
})
