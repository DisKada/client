<template>
  <div>
        <Navbar/>
      <div class="dashboardRoom">
          <div class="upperRoom" style="display: flex; flex-direction: row;">
              <div class="videoBox">
                 <div id="video-grid"></div>
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
  props:['peer','peerId'],
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
    },userId () {
      return this.$store.state.myId
    },
    connected () {
      return this.$store.state.isConnected
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
  },
  mounted () {
    console.log(this.peerId,'<<<< ini peer id diawal')
    console.log(this.userId,'<<<<<< ini user id dari connect ')
    console.log(this.connected, '<<<<<< conenct masukke room')
    const videoGrid = document.getElementById('video-grid')
    const myPeer = this.peer
    console.log(myPeer,'<<<ini peer')
    let myVideoStream
    const myVideo = document.createElement('video')
    myVideo.muted = true
    const peers = {}
    navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true
    }).then(stream => {
      myVideoStream = stream
      addVideoStream(myVideo, stream)
      myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })
    if(this.connected === true) {
      connectToNewUser(this.userId,stream)
    }
    })

    // if (this.connected === false) {
    //   if (peers[this.userId]) peers[this.userId].close()
    // }

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })

      peers[userId] = call
    }
    function addVideoStream(video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      videoGrid.append(video)
    }
  }
}
</script>

<style>
  @import '../assets/styles/Room.css';
</style>
