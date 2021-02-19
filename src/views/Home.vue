<template>
  <div class="home">
    <Navbar/>
  </div>
</template>

<script>
// @ is an alias to /src
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
