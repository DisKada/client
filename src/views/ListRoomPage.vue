<template>
  <div>
      <Navbar/>
      <div class="listRoom">
        <form @submit.prevent="createRoom">
          <input type="text" v-model="roomName">
          <button type="submit" >create room</button>
        </form>
          <ol class="articles">
          <div v-if="rooms.length != 0">
            <RoomCard v-for="(room, idx) in rooms" :key="idx" :room="room"/>
          </div>
          <div v-else>
            <p>no available rooms</p>
          </div>
          </ol>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'

export default {
  name: 'ListRoom',
  data () {
    return {
      roomName: ''
    }
  },
  components: {
    RoomCard,
    Navbar
  },
  methods: {
    createRoom () {
      const payload = {
        'room-name': this.roomName,
        admin: localStorage.username
      }
      this.$socket.emit('create-room', payload)
      this.roomName = ''
    }
  },
  computed: {
    rooms () {
      return this.$store.state.rooms
    }
  }
}
</script>

<style>
    @import '../assets/styles/ListRoom.css';
    @import '../assets/styles/CardRoom.css';
</style>
