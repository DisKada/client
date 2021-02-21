<template>
  <div>
        <Navbar/>
      <div class="dashboardRoom">
          <div class="upperRoom" style="display: flex; flex-direction: row;">
              <div class="videoBox">

              </div>
              <button @click="toHome">keluar</button>
          </div>
          <div class="chatBox">
              <BubbleChat/>
              <BubbleChat/>
              <BubbleChat/>
              <BubbleChat/>
              <BubbleChat/>
              <BubbleChat/>
              <BubbleChat/>
          </div>
          <div class="inputChat">
              <div class="input">
                  <input type="text">
              </div>
              <button>send</button>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import BubbleChat from '../components/bubbleChat'

export default {
  components: {
    Navbar,
    BubbleChat
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/rooms' })
    }
  }
}
</script>

<style>
  @import '../assets/styles/Room.css';
</style>
