import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' }
  ]
})

export default router
