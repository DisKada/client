<template>
  <div >
    <ol class="articles">
        <li class="articles__article" style="--animation-order:1">
          <!-- <a class="articles__link"> -->
            <div class="articles__content articles__content--lhs">
                <h2 class="articles__title">{{room.name}}</h2>
                <div class="articles__footer">
                <p> <b>Peserta: 10</b> </p>
                <time>1 Maret 2021</time>
                </div>
                <button type="submit" @click="joinRoom(room.name)">join room</button>
            </div>
            <!-- <div class="articles__content articles__content--rhs" aria-hidden="true">
                <h2 class="articles__title">Nama Room</h2>
                <div class="articles__footer">
                <p><b>Peserta: 10</b></p>
                <time>1 Maret 2021</time>
                </div>
            </div></a> -->
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
