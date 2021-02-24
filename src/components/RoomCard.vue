<template>
  <div >
    <ol class="articles">
        <li class="articles__article" style="--animation-order:1">
          <!-- <a class="articles__link"> -->
            <div class="articles__content articles__content--lhs">
                <h2 class="articles__title">{{room.name}}</h2>
                <div class="articles__footer">
                <p> <b>Peserta: {{counter}}</b> </p>
                </div>
                <div v-if="counter < maxPlayer">
                <button type="submit" @click="joinRoom(room.name)">join room</button>
                </div>
            </div>
        </li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoomCard',
  props: ['room'],
  methods: {
    joinRoom (name) {
      // console.log(name, 'ini dipencet')
      const payload = {
        playerName: this.myName,
        roomName: name
      }
      this.$socket.emit('join-room', payload)
      this.$store.commit('clearMsg')
    }
  },
  computed: {
    ...mapState(['myName']),
    maxPlayer () {
      const b = this.$store.state.maxPlayer
      console.log(b, '<<<<<maxplayer')
      return b
    },
    counter () {
      return this.$store.state.counter
    }
  }
}
</script>

<style>
    @import '../assets/styles/CardRoom.css';
</style>
