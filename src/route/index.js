import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/profile.vue'
import EditProfile from '../pages/Edit-Profile.vue'
import Concern from 'pages/Concern.vue'
import Collect from 'pages/Collect.vue'
import Test from 'pages/Test.vue'
import Comment from 'pages/Comment.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/concern', component: Concern, name: 'concern' },
    { path: '/collect', component: Collect, name: 'collect' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/comment', component: Comment, name: 'comment' }
  ]
})
const AuthUrl = ['/profile', '/edit-profile', '/concern', '/comment']

router.beforeEach((to, from, next) => {
  if (AuthUrl.includes(to.path)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
