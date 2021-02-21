import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: null,
    room: '',
    isCreator: false,
    myKey: '',
    myName: '',
    myScore: '',
    otherPlayers: {},
    rooms: [],
    errorMsg: ''
  },
  mutations: {
    resetState (state, payload) {
      state.rooms = []
      state.room = ''
      state.isCreator = false
      state.myKey = ''
      state.myScore = 0
      state.otherPlayers = {}
    },
    setRooms (state, payload) {
      state.rooms = payload
    },
    createRooms (state, payload) {
      state.rooms.push(payload)
    },
    showError (state, payload) {
      state.errorMsg = payload
    },
    setRoom (state, payload) {
      state.room = payload
    },
    setIsCreator (state, payload) {
      state.isCreator = payload
    },
    setMyKey (state, payload) {
      state.myKey = payload
    },
    setMyName (state, payload) {
      state.myName = payload
    },
    setMyScore (state, payload) {
      state.myScore = payload
    },
    setOtherPlayers (state, payload) {
      delete payload[state.myKey]
      console.log(payload)
      state.otherPlayers = payload
    },
    updateOtherScore (state, payload) {
      state.otherPlayers[payload.key] = payload.score
    },
    setSocket (state, payload) {
      state.socket = payload
    }
  },
  actions: {
    SOCKET_getRooms (context, payload) {
      context.commit('setRooms', payload)
      console.log(payload, '<<<<---')
    },
    SOCKET_roomCreated (context, payload) {
      context.commit('createRooms', payload)
      console.log(payload, 'nambah room<<<<---')
    },
    SOCKET_showError (context, payload) {
      context.commit('showError', payload)
      console.log(payload, 'nampilin error <<<<---')
    },
    SOCKET_getIntoRoom (context, payload) {
      console.log(payload, 'ini dari emit server')
      payload.isCreator && context.commit('setIsCreator', true)
      context.commit('setMyKey', payload.palyerKey)
      context.commit('setRoom', payload.name)
      context.commit('setOtherPlayers', payload.players)
      router.push(`/about/${payload.name}`)
      console.log(payload, 'masuk ke room<<<<---')
    },
    SOCKET_updateClientRoom (context, payload) {
      context.commit('setRooms', payload)
      console.log(payload, '<<<<--- yang di update')
    },
    SOCKET_endRoom () {
      console.log('ini dari server endroom')
      router.push('/rooms')
    },
    login (context, payload) {
      axios
        .post('/users/login', payload)
        .then(response => {
          // console.log(response.data.username)
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          context.commit('setMyName', response.data.username)
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
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
