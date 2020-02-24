import Vue from 'vue'

import App from './App.vue'

import router from './route'

import './styles/base.css'

import './styles/iconfont.css'

import 'lib-flexible'

import HmInput from 'components/hm-input.vue'

import HmButton from 'components/hm-button.vue'

import axios from 'axios'

import { Toast } from 'vant'

Vue.config.productionTip = false

Vue.component('HmInput', HmInput)

Vue.component('HmButton', HmButton)

Vue.prototype.$axios = axios

Vue.use(Toast)

// axios.default.baseUrl = 'http://localhost:3000' 错误写法
axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
