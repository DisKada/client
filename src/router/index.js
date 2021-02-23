import Vue from 'vue'
import VueRouter from 'vue-router'
import ListCalonPage from '../views/ListCalonPage.vue'
import LoginAndRegisterPage from '../views/LoginAndRegisterPage.vue'
import ListRoomPage from '../views/ListRoomPage.vue'
import UserProfile from '../views/UserProfile.vue'
import DetailCalon from '../views/DetailCalon.vue'
import editProfileUser from '../views/editProfileUser.vue'
import editCalon from '../views/editCalon.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListCalonPage',
    component: ListCalonPage
  },
  {
    path: '/edit/calon/:id',
    name: 'editCalon',
    component: editCalon
  },
  {
    path: '/',
    name: 'ListCalonPage',
    component: ListCalonPage
  },
  {
    path: '/edit/user/:id',
    name: 'editProfileUser',
    component: editProfileUser
  },
  {
    path: '/calon/:id',
    name: 'DetailCalon',
    component: DetailCalon
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: Room
  },
  {
    path: '/profile/:id',
    name: 'UserProfile',
    component: UserProfile
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
