import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/profile.vue'
import EditProfile from '../pages/Edit-Profile.vue'
import Concern from 'pages/Concern.vue'
import Collect from 'pages/Collect.vue'
import Test from 'pages/Test.vue'
import Test1 from 'pages/Test1.vue'
import Test2 from 'pages/Test2.vue'
import Test3 from 'pages/Test3.vue'
import Comment from 'pages/Comment.vue'
import Home from 'pages/Home.vue'
import Column from 'pages/Column.vue'
import Detail from 'pages/Detail.vue'
import Search from 'pages/Search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/concern', component: Concern, name: 'concern' },
    { path: '/collect', component: Collect, name: 'collect' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/test1', component: Test1, name: 'test1' },
    { path: '/test2', component: Test2, name: 'test2' },
    { path: '/test3', component: Test3, name: 'test3' },
    { path: '/comment', component: Comment, name: 'comment' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/column', component: Column, name: 'column' },
    { path: '/detail/:id', component: Detail, name: 'detail' },
    { path: '/search', component: Search, name: 'search' }
  ]
})
const AuthUrl = ['/profile', '/edit-profile', '/concern', '/comment', '/collect']

router.beforeEach((to, from, next) => {
  if (AuthUrl.includes(to.path)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
