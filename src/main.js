import Vue from 'vue'

import App from './App.vue'

import router from './route'

import './styles/base.css'

import './styles/iconfont.css'

import 'lib-flexible'

import HmInput from 'components/hm-input.vue'

import HmButton from 'components/hm-button.vue'

import HmNav from 'components/hm-nav.vue'

import HmHeader from 'components/hm-header.vue'

import axios from 'axios'

import { Toast, Button, Dialog, Field, Icon, RadioGroup, Radio, Uploader } from 'vant'

import moment from 'moment'

Vue.config.productionTip = false

Vue.component('HmInput', HmInput)

Vue.component('HmButton', HmButton)

Vue.component('HmNav', HmNav)

Vue.component('HmHeader', HmHeader)

Vue.filter('time', function (value) {
  return moment(value).format('YYYY-MM-DD')
})

Vue.prototype.$axios = axios

Vue.use(Toast)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)

// axios.default.baseUrl = 'http://localhost:3000' 错误写法
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  // console.log(config.headers.Authorization)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    Toast.fail('请重新登录')
    router.push('/login')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
