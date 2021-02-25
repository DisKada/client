<template>
  <div id="app">
    <router-view :peer="peer" :peerId='peerId'/>
  </div>
</template>

<script>
export default {
  mounted () {
    this.peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/',
      port: '3000'
    })
    this.peer.on('open', id => {
      console.log(id,'<<<<< dari app')
      this.peerId = id
    })
  },
  data () {
    return {
      peer : null,
      peerId: null
    }
  }
}
</script>


<style>
/* body::-webkit-scrollbar {
    width: 0.8rem;
}
body::-webkit-scrollbar-thumb {
    background: #90A4AE
} */
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>