import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: [],
    roomName: '',
    socket: null,
    isCreator: false,
    otherPlayers: {},
    myKey: '',
    room: '',
    rooms: [],
    myName: '',
    errorMsg: '',
    profile: {
      id: 0,
      username: '',
      email: '',
      visi: '',
      misi: '',
      status: '',
      partai: '',
      pendidikan: '',
      calon: '',
      image: '',
      pekerjaan: ''
    },
    getEdit: {
      id: 0,
      username: '',
      visi: '',
      misi: '',
      status: '',
      partai: '',
      pendidikan: '',
      calon: '',
      image: '',
      pekerjaan: ''
    },
    getDetail: {
      id: 0,
      username: '',
      visi: '',
      misi: '',
      partai: '',
      pendidikan: '',
      calon: '',
      image: '',
      pekerjaan: ''
    },
    profiles: [],
    isLoading: true
  },
  mutations: {
    resetState (state, payload) {
      state.rooms = []
      state.room = ''
      state.isCreator = false
      state.myKey = ''
      state.otherPlayers = {}
    },
    createRooms (state, payload) {
      state.rooms.push(payload)
    },
    showError (state, payload) {
      state.errorMsg = payload
    },
    setOtherPlayers (state, payload) {
      delete payload[state.myKey]
      console.log(payload)
      state.otherPlayers = payload
    },
    setRoom (state, payload) {
      state.room = payload
    },
    setMyKey (state, payload) {
      state.myKey = payload
    },
    setRooms (state, payload) {
      state.rooms = payload
    },
    setMyName (state, payload) {
      state.myName = payload
    },
    fetchProfile (state, payload) {
      // console.log(payload, '<<<<dr mutation')
      state.profile.id = payload.id
      state.profile.username = payload.username
      state.profile.visi = payload.visi
      state.profile.misi = payload.misi
      state.profile.status = payload.status
      state.profile.partai = payload.partai
      state.profile.pendidikan = payload.pendidikan
      state.profile.calon = payload.calon
      state.profile.image = payload.image
      state.profile.pekerjaan = payload.pekerjaan
      state.profile.email = payload.email
    },
    fetchAllVerified (state, payload) {
      state.profiles = payload
    },
    isLoadingHandler (state, payload) {
      state.isLoading = payload
    },
    getEdit (state, payload) {
      state.getEdit.id = payload.id
      state.getEdit.username = payload.username
      state.getEdit.visi = payload.visi
      state.getEdit.misi = payload.misi
      state.getEdit.status = payload.status
      state.getEdit.partai = payload.partai
      state.getEdit.pendidikan = payload.pendidikan
      state.getEdit.calon = payload.calon
      state.getEdit.pekerjaan = payload.pekerjaan
    },
    getDetail (state, payload) {
      state.getDetail.id = payload.id
      state.getDetail.username = payload.username
      state.getDetail.visi = payload.visi
      state.getDetail.misi = payload.misi
      state.getDetail.partai = payload.partai
      state.getDetail.pendidikan = payload.pendidikan
      state.getDetail.calon = payload.calon
      state.getDetail.image = payload.image
      state.getDetail.pekerjaan = payload.pekerjaan
    },
    uploadImg (state, payload) {
      state.getEdit.image = payload
    },
    setMsg (state, payload) {
      state.msg.push(payload)
    },
    roomName (state, payload) {
      state.roomName = payload
    },
    clearMsg (state, payload) {
      state.msg = []
    }
  },
  actions: {
    SOCKET_msgServer (context, payload) {
      // console.log(payload, '<<<<< dr server socket')
      context.commit('setMsg', payload)
    },
    SOCKET_getRooms (context, payload) {
      context.commit('setRooms', payload)
      // console.log(payload, '<<<<---')
    },
    SOCKET_roomCreated (context, payload) {
      context.commit('createRooms', payload)
      context.commit('roomName', payload.name)
      // console.log(payload, 'nambah room<<<<---')
    },
    SOCKET_showError (context, payload) {
      context.commit('showError', payload)
      // console.log(payload, 'nampilin error <<<<---')
    },
    SOCKET_getIntoRoom (context, payload) {
      // console.log(payload, 'ini dari emit server')
      payload.isCreator && context.commit('setIsCreator', true)
      context.commit('setMyKey', payload.palyerKey)
      context.commit('setRoom', payload.name)
      context.commit('setOtherPlayers', payload.players)
      router.push(`/room/${payload.name}`)
      // console.log(payload, 'masuk ke room<<<<---')
    },
    SOCKET_updateClientRoom (context, payload) {
      context.commit('setRooms', payload)
      // console.log(payload, '<<<<--- yang di update')
    },
    SOCKET_endRoom () {
      // console.log('ini dari server endroom')
      router.push('/rooms')
    },
    login (context, payload) {
      // console.log(payload, '<<<<')
      axios
        .post('/users/login', payload)
        .then(response => {
          // console.log('masukk sinii')
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('userId', response.data.id)
          context.commit('setMyName', response.data.username)
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
    },
    getEdit (context, payload) {
      const headers = { access_token: localStorage.access_token }
      axios
        .get(`/users/${payload}`, { headers })
        .then(response => {
          context.commit('getEdit', response.data)
          router.push(`/edit/user/${response.data.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit (context, payload) {
      const headers = { access_token: localStorage.access_token }
      const obj = context.state.getEdit
      console.log(obj, '<<<<<edit action')
      axios
        .put(`/users/${payload}`, obj, { headers })
        .then(response => {
          console.log(response.data, '<<<< dr server')
          router.push(`/profile/${payload}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail (context, payload) {
      const headers = { access_token: localStorage.access_token }
      axios
        .get(`/users/${payload}`, { headers })
        .then(response => {
          context.commit('getDetail', response.data)
          router.push(`/calon/${response.data.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
