<template>
  <div>
        <Navbar/>
      <div class="dashboardRoom">
          <div class="upperRoom" style="display: flex; flex-direction: row;">
              <div class="videoBox">

              </div>
          </div>
          <div class="chatBox">
              <BubbleChat v-for="(message, i) in msg" :key="i" :message="message"/>
          </div>
          <div class="inputChat">
              <div class="input" v-if="profile.status !== 'verified'">
                  <input type="text" v-model="text">
              </div>
              <button @click.prevent="sendMsg" v-if="profile.status !== 'verified'">send</button>
          <button type="submit" @click.prevent="leaveRoom" v-if="profile.status !== 'verified'"> leave room </button>
          <button type="submit" @click.prevent="endRoom(room)" v-if="profile.status === 'verified'"> end room </button>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import BubbleChat from '../components/bubbleChat'
import { mapState } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    if (from.name) {
      next()
    } else {
      next('/')
    }
  },
  computed: {
    ...mapState([
      'isCreator',
      'myName',
      'myKey',
      'room',
      'otherPlayers'
    ]),
    msg () {
      return this.$store.state.msg
    },
    profile () {
      return this.$store.state.profile
    }
  },
  name: 'Room',
  data () {
    return {
      name: localStorage.username,
      username: localStorage.getItem('username'),
      text: ''
    }
  },
  components: {
    Navbar,
    BubbleChat
  },
  created () {
    this.$store.dispatch('fetchProfile')
  },
  methods: {
    sendMsg () {
      // console.log(this.message, '<<<<< room name')
      this.$socket.emit('newMessage', { message: this.text, username: this.username, room: this.$store.state.roomName })
      // this.$store.commit('setMsg', this.message)
      this.text = ''
    },
    leaveRoom () {
      this.$socket.emit('leave-room', {
        roomName: this.room,
        playerKey: this.myKey
      })
      this.$router.push('/rooms')
      this.$store.commit('clearMsg')
    },
    endRoom (room) {
      this.$socket.emit('end-room', room)
      this.$store.dispatch('SOCKET_endRoom')
      this.$store.commit('clearMsg')
    }
  }
}
</script>

<style>
  @import '../assets/styles/Room.css';
</style>
