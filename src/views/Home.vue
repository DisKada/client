<template>
  <div class="home">
    <Navbar/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style>
  @import '../assets/styles/HomePage.css';
</style>
