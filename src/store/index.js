import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    profiles: [],
    isLoading: true
  },
  mutations: {
    fetchProfile (state, payload) {
      state.profile = payload
    },
    fetchAllVerified (state, payload) {
      state.profiles = payload
    },
    isLoadingHandler (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    login (context, payload) {
      axios
        .post('/users/login', payload)
        .then(response => {
          // console.log(response.data)
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('userId', response.data.id)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      axios
        .post('/users/register', payload)
        .then(response => {
          console.log(response.data)
          // context.commit('errHandling', '')
          // router.push('/login&register')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProfile (context, payload) {
      const id = localStorage.getItem('userId')
      const headers = { access_token: localStorage.access_token }
      // console.log(id, '<<<<')
      axios
        .get(`/users/${id}`, { headers })
        .then(response => {
          console.log(response.data, '<<<<<')
          context.commit('fetchProfile', response.data)
          context.commit('isLoadingHandler', false)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllVerified (context, payload) {
      const headers = { access_token: localStorage.access_token }
      axios
        .get('/users', { headers })
        .then(response => {
          console.log(response.data, '<<<<<')
          context.commit('fetchAllVerified', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout (context, payload) {
      localStorage.clear()
      router.push('/login&register')
    }
  }
})
