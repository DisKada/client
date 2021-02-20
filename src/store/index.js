import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    room: {}
  },
  mutations: {
    SOCKET_getRooms (state, payload) {
      console.log(payload, '<<<<')
      state.rooms = payload
    },
    SOCKET_updatedRoom (state, payload) {
      state.rooms = payload
    },
    SOCKET_roomDetail (state, payload) {
      state.room = payload
    }
  },
  actions: {
    login (context, payload) {
      axios
        .post('/users/login', payload)
        .then(response => {
          console.log(response)
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          router.push('/rooms')
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
          router.push('/login&register')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
