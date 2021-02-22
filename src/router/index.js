import Vue from 'vue'
import VueRouter from 'vue-router'
import ListCalonPage from '../views/ListCalonPage.vue'
import LoginAndRegisterPage from '../views/LoginAndRegisterPage.vue'
import ListRoomPage from '../views/ListRoomPage.vue'
import UserProfile from '../views/UserProfile.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListCalonPage',
    component: ListCalonPage
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

router.beforeEach((to, from, next) => {
  if (localStorage.access_token && to.name === 'LoginAndRegisterPage') {
    next({ name: 'ListCalonPage' })
  } else if (localStorage.access_token && to.name === 'LoginAndRegisterPage') {
    next({ name: 'ListCalonPage' })
  } else if (localStorage.access_token) {
    next()
  } else if (to.name === 'LoginAndRegisterPage' || to.name === 'LoginAndRegisterPage') {
    next()
  } else {
    next({ name: 'LoginAndRegisterPage' })
  }
})

export default router
