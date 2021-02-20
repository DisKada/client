<template>
  <div>
    <ol class="articles">
        <li class="articles__article" style="--animation-order:1"><a class="articles__link"></a>
            <div class="articles__content articles__content--lhs">
                <h2 class="articles__title">{{room.name}}</h2>
                <div class="articles__footer">
                <p> <b>Peserta: {{room.users.length}}</b> </p>
                <time>1 Maret 2021</time>
                <button type="submit" @click="joinRoom(room.name)">join room</button>
                </div>
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
export default {
  name: 'RoomCard',
  props: ['room'],
  methods: {
    joinRoom (name) {
      const payload = {
        'room-name': name,
        username: localStorage.username
      }
      this.$socket.emit('joinRoom', payload)
      this.$router.push(`/about/${name}`)
    }
  },
  computed: {
  }
}
</script>

<style>
    @import '../assets/styles/CardRoom.css';
</style>
