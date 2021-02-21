<template>
  <div>
      <Navbar/>
        <form>
          <input type="text" v-model="roomName" style="width:15rem" required>
          <button @click.prevent="createRoom" >create room</button>
        </form>
      <div class="listRoom">
            <!-- <div v-if="loading" class="w-100 text-center">
              <h1>Getting rooms...</h1>
            </div> -->
          <ol class="articles">
            <RoomCard v-for="(room) in rooms" :key="room.id" :room="room"/>
          </ol>
              <p>no available rooms</p>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'
import { mapState, mapMutations } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next(false)
    }
  },
  watch: {},
  created () {
    this.$store.commit('resetState')
    this.listenOnSocketEvent()
    this.listRoom()
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
      console.log(this.$store.state.rooms, 'ini masuk')
      // this.loading = false
      return this.$store.state.rooms
    },
    showError () {
      return this.$store.state.errorMsg
    }
  },
  mounted () {},
  methods: {
    ...mapMutations(['setMyName']),
    listRoom () {
      this.$socket.emit('get-rooms')
      this.setMyName(this.palyerName)
      this.loading = true
    },
    createRoom () {
      console.log(this.myName)
      const payload = {
        name: this.roomName,
        creator: this.myName
      }
      this.$socket.emit('create-room', payload)
    },
    listenOnSocketEvent () {
      // this.loading = false
      // this.$socket.on('getRooms', (rooms) => {
      //   console.log(rooms, 'dfsaf')
      //   this.roomList = rooms
      //   this.loading = false
      // })
      // this.$socket.on('room-created', (room) => {
      //   this.roomList.push(room)
      // })
      // this.$socket.on('show-error', (message) => {
      //   this.$myswal.showError(message)
      // })
      // this.$socket.on('get-in-to-room', (room) => {
      //   room.isCreator && this.$store.commit('setIsCreator', true)
      //   this.$store.commit('setMyKey', room.playerKey)
      //   this.$store.commit('setRoom', room.name)
      //   this.$store.commit('setOtherPlayers', room.players)
      //   this.$store.commit('setMyScore', 0)
      //   this.$router.push('/about')
      // })
      // this.$socket.on('update-client-room', () => {
      //   this.$socket.emit('get-rooms')
      // })
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
</style>
