<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Attendant: {{room.users.length}}</p>
    <button type="submit" @click="leaveRoom(name)"></button>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      name: localStorage.username
    }
  },
  methods: {
    leaveRoom (name) {
      const payload = {
        'room-name': this.room.users.name,
        username: name
      }
      this.$socket.emit('leaveRoom', payload)
      this.$router.push('/rooms')
    }
  },
  computed: {
    room () {
      return this.$store.state.room
    }
  }
}
</script>

<style>

</style>
