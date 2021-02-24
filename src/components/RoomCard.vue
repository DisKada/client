<template>
  <div >
    <ol class="articles">
        <li class="articles__article" style="--animation-order:1">
          <div class="articles__link">
            <div class="articles__content articles__content--lhs">
                <h2 class="articles__title">{{room.name.split('-').slice(0,1).join()}}</h2>
                <div class="articles__footer d-flex flex-column">
                  <p ><b>max attending 10</b></p>
                  <div v-if="counter <= 10">
                    <button type="submit" @click="joinRoom(room.name)">join room</button>
                  </div>
               </div>
            </div> 
            <div class="articles__content articles__content--rhs" aria-hidden="true">
                <h2 class="articles__title">{{room.name.split('-').slice(0,1).join()}}</h2>
                <div class="articles__footer d-flex flex-column">
                  <p ><b>max attending 10</b></p>
                  <div v-if="counter <= 10">
                    <button type="submit" @click="joinRoom(room.name)">join room</button>
                  </div>
               </div>
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
  props: ['room','peer','peerId'],
  methods: {
    joinRoom () {
      // console.log(name, 'ini dipencet')
      const payload = {
        playerName: this.myName,
        roomName: this.room.name
      }
      this.$socket.emit('join-room', payload,  this.peerId)
      this.$store.commit('clearMsg')
    }
  },
  computed: {
    ...mapState(['myName']),
    // maxPlayer () {
    //   const b = this.$store.state.maxPlayer
    //   console.log(b, '<<<<<maxplayer')
    //   return b
    // },
    counter () {
      return this.$store.state.counter
    }
  }
}
</script>

<style>
    @import '../assets/styles/CardRoom.css';
    .joinBtn {
      width: 50px
    }
</style>
