import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginAndRegisterPage from '../views/LoginAndRegisterPage.vue'
import ListRoomPage from '../views/ListRoomPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rooms',
    name: 'ListRoom',
    component: ListRoomPage
  },
  {
    path: '/login&register',
    name: 'LoginAndRegisterPage',
    component: LoginAndRegisterPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
