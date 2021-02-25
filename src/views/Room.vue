<template>
  <div>
    <div class="main">
        <div class="main__left">
          <div class="main__videos d-flex flex-column">
              <div id="video-grid">
                <h4>{{(Object.keys(otherPlayers)[0].toString(). split('-')[1])}}</h4>
              </div>
          </div>
          <div class="main__controls">
              <div class="main__controls__block">
                <div @click="muteUnmute" class="main__controls__button main__mute_button">
                  <div v-if = "muted === true" class="d-flex flex-column">
                    <i class="fas fa-microphone"></i>
                    <span>Mute</span>                  
                  </div>
                  <div v-if = "muted === false" class="d-flex flex-column">
                    <i class="fas fa-microphone-slash" style="color:red"></i>
                    <span>Unmute</span>                  
                  </div>
                  
                </div>
                <div @click="playStop" class="main__controls__button main__video_button" >
                  <div v-if = "videoShare === true" class="d-flex flex-column">
                    <i class="fas fa-video"></i>
                    <span>Stop Video</span>
                  </div >
                  <div v-if = "videoShare === false" class="d-flex flex-column">
                    <i class="stop fas fa-video-slash"></i>                    
                    <span>Play Video</span>
                  </div >
                </div>
              </div>        
                <div class="main__controls__button">
                    <p class="fw-bold">Pembicara : {{(Object.keys(otherPlayers)[0].toString().split('-')[1])}}</p>
                </div>
              <div class="main__controls__block">
                <div class="main__controls__button">
                    <button type="submit" @click="leaveRoom" v-if="!isCreator"> leave room </button>
                    <button type="submit" @click="endRoom(room)" v-if="isCreator"> end room </button>
                </div>
              </div>
          </div>
        </div>
        <div class="main__right">
          <div class="main__header">
              <h6>Chat</h6>
          </div>
          <div class="main__chat_window">
            <div class="chatBox">
                <BubbleChat v-for="(message, i) in msg" :key="i" :message="message"/>
            </div>
          </div>
          <div class="main__message_container">
            <input type="text" v-model="text" class="input border-bottom">
            <div class="main__controls__button">
              <button @click.prevent="sendMsg" class="btn btn-success btn-sm" >send</button>
              <div class="input" v-if="profile.status !== 'verified'">
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import BubbleChat from '../components/bubbleChat'
import { mapState,mapMutations } from 'vuex'

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
    ...mapMutations(['setButtonJoin']),
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
    },
    userId () {
      return this.$store.state.myId
    },
    connected () {
      return this.$store.state.isConnected
    },
    disconnected () {
      return this.$store.state.isDisconnected
    }
  },
  name: 'Room',
  data () {
    return {
      name: localStorage.username,
      username: localStorage.getItem('username'),
      text: '',
      muted: true,
      streamVid: null,
      videoShare: true
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
      this.$socket.emit('newMessage', { message: this.text, username: this.username, room: this.$store.state.roomName })
      this.text = ''
    },
    leaveRoom () {
      this.$socket.emit('leave-room', {
        roomName: this.room,
        playerKey: this.myKey
      })
      // this.$socket.emit('disconnected')
      this.$router.push('/rooms')
      this.$store.commit('clearMsg')
      window.location.reload()
    },
    endRoom (room) {
      // this.$socket.emit('disconnected')
      this.$socket.emit('end-room', room)
      this.$store.dispatch('SOCKET_endRoom')
      this.$store.commit('clearMsg')
      window.location.reload()
    },
    muteUnmute () {
      console.log('masuk mute')
      const enabled = this.streamVid.getAudioTracks()[0].enabled;
      console.log(enabled,'ini enable')
      if (enabled) {
        this.streamVid.getAudioTracks()[0].enabled = false;
        this.muted = false
      } else {
        this.muted = true
        this.streamVid.getAudioTracks()[0].enabled = true;
      }
    },
    playStop () {
      let enabled = this.streamVid.getVideoTracks()[0].enabled;
      if (enabled) {
        this.streamVid.getVideoTracks()[0].enabled = false;
        this.videoShare = false
      } else {
        this.videoShare = true
        this.streamVid.getVideoTracks()[0].enabled = true;
      }
    }
  },
  mounted () {
    // console.log(this.peerId,'<<<< ini peer id diawal')
    // console.log(this.userId,'<<<<<< ini user id dari connect ')
    // console.log(this.connected, '<<<<<< conenct masukke room')
    // console.log(myPeer,'<<<ini peer')
    const videoGrid = document.getElementById('video-grid')
    const myPeer = this.peer
    let myVideoStream
    const myVideo = document.createElement('video')
    myVideo.muted = true
    const peers = {}
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myVideoStream = stream
      this.streamVid = stream
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

    if (this.disconnected === true) {
      if (peers[this.userId]) peers[this.userId].close()
    }

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
    const scrollToBottom = () => {
      var d = $('.main__chat_window');
      d.scrollTop(d.prop("scrollHeight"));
    }
  }
}
</script>

<style>
  @import '../assets/styles/styleRoom.css';
</style>
