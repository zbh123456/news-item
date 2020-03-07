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

import HmPost from 'components/hm-post.vue'

import axios from 'axios'

import { Toast, Button, Dialog, Field, Icon, RadioGroup, Radio, Uploader, List, Tab, Tabs, PullRefresh } from 'vant'

import moment from 'moment'

Vue.config.productionTip = false

Vue.component('HmInput', HmInput)

Vue.component('HmButton', HmButton)

Vue.component('HmNav', HmNav)

Vue.component('HmHeader', HmHeader)

Vue.component('HmPost', HmPost)

Vue.filter('time', function (value, str = 'YYYY-MM-DD') {
  return moment(value).format(str)
})

Vue.filter('fixUrl', function (value) {
  return axios.defaults.baseURL + value
})

Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})
Vue.filter('second', function (value) {
  var now = new Date()
  var date = new Date(value)
  var deltaInSeconds = Math.floor((now - date) / 1000)
  var hours = Math.floor(deltaInSeconds / 60 / 60) % 24
  return hours
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
Vue.use(List)
Vue.use(Tab)
Vue.use(PullRefresh)
Vue.use(Tabs)

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
