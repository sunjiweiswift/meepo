// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// store对象生成器
import generateStore from './store/store.js'
import ElementUI from 'element-ui'
import axios from 'axios'
import Qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'

require('es6-promise').polyfill()
Vue.use(Vuex)
Vue.use(ElementUI)

Vue.prototype.axios = axios
Vue.prototype.qs = Qs
Vue.config.productionTip = false
const storeObj = generateStore({userInfo: {}, templateInfo: [], menuDisabled: true, templateId: ''})
const store = new Vuex.Store(storeObj)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
