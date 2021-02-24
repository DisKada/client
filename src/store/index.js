import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: [],
    roomName: '',
    isCreator: false,
    otherPlayers: {},
    myKey: '',
    room: '',
    rooms: [],
    myName: '',
    errorMsg: '',
    myId: '',
    isConnected: null,
    isDisconnected: null,
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
      pekerjaan: '',
      tempat_lahir: '',
      tanggal_lahir: ''
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
      pekerjaan: '',
      tanggal_lahir: '',
      tempat_lahir: ''
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
      pekerjaan: '',
      tanggal_lahir: '',
      tempat_lahir: ''
    },
    profiles: [],
    maxPlayer: 0,
    counter: 0
  },
  mutations: {
    maxPlayer (state, payload) {
      console.log(payload, 'dr mutation')
      state.maxPlayer = payload
    },
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
      console.log(payload,'<<<<<<<<<<<<<< players baru')
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
    setMyId (state, payload) {
      state.myId = payload
    },
    setIsCreator (state, payload) {
      state.isCreator = payload
    },
    setConnected (state, payload) {
      state.isConnected = payload
    },
    setDisconnected (state, payload) {
      state.isDisconnected = payload
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
      state.getEdit.tanggal_lahir = payload.tanggal_lahir
      state.getEdit.tempat_lahir = payload.tempat_lahir
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
    },
    counter (state, payload) {
      state.counter = payload
    }
  },
  actions: {
    SOCKET_counter (context, payload) {
      context.commit('counter', payload)
    },
    SOCKET_maxPlayer (context, payload) {
      context.commit('maxPlayer', payload)
    },
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
    SOCKET_userConnected(context, payload) {
      console.log(payload, '<<<<--- yang di dari conneted')
      context.commit('setMyId', payload)
      context.commit('setConnected',true)
    },
    SOCKET_userDisconnected(context, payload) {
      console.log(payload, '<<<<--- yang di dari dosconneted')
      context.commit('setMyId', payload)
      context.commit('setDisconnected',true)
    },
    login (context, payload) {
      // console.log(payload, '<<<<')
      axios
        .post('/users/login', payload)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: `Hi ${payload.email} !`,
            text: 'Welcome to diskada '
          })
          // console.log('masukk sinii')
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('userId', response.data.id)
          context.commit('setMyName', response.data.username)
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    register (context, payload) {
      axios
        .post('/users/register', payload)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Your Email Success To Register',
            text: `Please Remember Your Email is : ${response.data.email}`
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    fetchProfile (context, payload) {
      const id = localStorage.getItem('userId')
      const headers = { access_token: localStorage.access_token }
      // console.log(id, '<<<<')
      axios
        .get(`/users/${id}`, { headers })
        .then(response => {
          // console.log(response.data, '<<<<<')
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
          // console.log(response.data, '<<<<<')
          context.commit('fetchAllVerified', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout (context, payload) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You can back any time to visit Us',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, i'm leaving~"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          router.push('/login&register')
          Swal.fire({
            icon: 'success',
            title: 'Good Bye',
            text: 'Thank you for your visit, have a nice day'
          })
        }
      })
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
      // console.log(obj, '<<<<<edit action')
      axios
        .put(`/users/${payload}`, obj, { headers })
        .then(response => {
          // console.log(response.data, '<<<< dr server')
          Swal.fire({
            icon: 'success',
            text: `Profile edited`
          })
          router.push(`/profile/${payload}`)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something got wrong'
          })
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
