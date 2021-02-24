<template>
  <div>
      <Navbar/>
      <h1>List Room</h1>
      <div class="listRoom">
          <ol class="articles">
          <RoomCard v-for="(room) in rooms" :key="room.id" :room="room"/>
          </ol>
          <div class="createRoom" v-if="profile.status === 'verified'">
            <button @click.prevent="createRoom" class="buttonCreateRoom">create room</button>
          </div>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'
import { mapState, mapMutations } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next(false)
    }
  },
  created () {
    this.$store.commit('resetState')
    // this.listenOnSocketEvent()
    this.listRoom()
    this.$store.dispatch('fetchProfile')
  },
  name: 'ListRoom',
  data () {
    return {
      roomName: '',
      roomList: [],
      loading: false,
      palyerName: localStorage.getItem('username')
    }
  },
  components: {
    RoomCard,
    Navbar
  },
  computed: {
    ...mapState(['myName']),
    rooms () {
      // console.log(this.$store.state.rooms, 'ini masuk')
      // this.loading = false
      return this.$store.state.rooms
    },
    showError () {
      return this.$store.state.errorMsg
    },
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
    ...mapMutations(['setMyName']),
    listRoom () {
      this.$socket.emit('get-rooms')
      this.setMyName(this.palyerName)
      this.loading = true
    },
    async createRoom () {
      const { value: formValues } = await Swal.fire({
        title: 'Buat Room',
        html:
          '<label>Nama Room</label>' +
          '<input id="swal-input1" class="swal2-input">' +
          '<label>Jumlah Maksimal Peserta</label>' +
          '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
      const payload = {
        name: formValues[0],
        creator: this.myName,
        max: Number(formValues[1])
      }
      console.log(Number(formValues[1]), '<<<<< dr form')
      // this.$store.commit('maxPlayer', Number(formValues[1]))
      this.$socket.emit('create-room', payload)
    }
  },
  destoyed () {
    this.$socket.off('get-rooms')
    this.$socket.off('roomCreated')
    this.$socket.off('getInToRoom')
  }
}
</script>

<style>
    @import '../assets/styles/ListRoom.css';
    @import '../assets/styles/CardRoom.css';
    .listRoom {
      margin-bottom: -50%;
      display: flex;
      flex-direction: row;
    }

    .createRoom {
      justify-content: center;
      margin-top: 30px;
    }
    .buttonCreateRoom{
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
      opacity: 0.7;
      transition: 0.5s;
    }
    .buttonCreateRoom:hover{
      transition: 0.5s;
      opacity: 1;
      transform: scale(1.3);
    }
    .buttonCreateRoom:active{
      transform: scale(1);
    }
</style>
