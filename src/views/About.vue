<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Attendant: </p>
    <button type="submit" @click.prevent="leaveRoom"> leave room </button>
    <button type="submit" @click.prevent="endRoom(room)"> end room </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    if (from.name) {
      next()
    } else {
      next('/')
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   if (this.isCreator && !this.isGameEnded) {
  //     alert('owner cannot leave this room')
  //     next(false)
  //   } else {
  //     var r = confirm('leave room')
  //     if (r === true) {
  //       this.$socket.emit('leave-room', {
  //         roomName: this.room,
  //         playerKey: this.myKey
  //       })
  //       next()
  //     } else {
  //       next(false)
  //     }
  //   }
  // },
  computed: {
    ...mapState([
      'isCreator',
      'myName',
      'myKey',
      'room',
      'otherPlayers'
    ])
  },
  name: 'About',
  data () {
    return {
      name: localStorage.username
    }
  },
  methods: {
    leaveRoom () {
      this.$socket.emit('leave-room', {
        roomName: this.room,
        playerKey: this.myKey
      })
      this.$router.push('/rooms')
    },
    endRoom (room) {
      this.$socket.emit('end-room', room)
      this.$store.dispatch('SOCKET_endRoom')
    }
  }
}
</script>

<style>

</style>
