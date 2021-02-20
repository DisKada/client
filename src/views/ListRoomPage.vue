<template>
  <div>
      <Navbar/>
      <div class="listRoom">
          <ol class="articles">
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          </ol>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'

export default {
  name: 'ListRoom',
  components: {
    RoomCard,
    Navbar
  }
}
</script>

<style>
    @import '../assets/styles/ListRoom.css';
    @import '../assets/styles/CardRoom.css';
</style>
