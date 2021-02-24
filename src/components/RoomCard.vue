<template>
  <div >
    <ol class="articles">
        <li class="articles__article" style="--animation-order:1">
          <div class="articles__link">
            <div class="articles__content articles__content--lhs">
                <h2 class="articles__title">{{room.name.split('-').slice(0,1).join()}}</h2>
                <div class="articles__footer">
                <p> <b>Peserta: 10</b> </p>
                <time>1 Maret 2021</time>
                </div>
                <button type="submit" @click="joinRoom">join room</button>
            </div>
            <div class="articles__content articles__content--rhs" aria-hidden="true">
                <h2 class="articles__title">{{room.name.split('-').slice(0,1).join()}}</h2>
                <div class="articles__footer">
                <p><b>Peserta: 10</b></p>
                <time>1 Maret 2021</time>
                </div>
            </div></div> 
        </li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoomCard',
  props: ['room','peer','peerId'],
  methods: {
    joinRoom () {
      // console.log(name, 'ini dipencet')
      const payload = {
        playerName: this.myName,
        roomName: this.room.name
      }
      this.$socket.emit('join-room', payload,  this.peerId)
    }
  },
  computed: {
    ...mapState(['myName']),
    players () {
      return Object.keys(this.room.players).map(key => key.split('-')[1])
    }
  }
}
</script>

<style>
    @import '../assets/styles/CardRoom.css';
</style>
