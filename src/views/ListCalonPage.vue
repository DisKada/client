<template>
  <div class="d-flex flex-column bd-highlight" style="min-height: 100vh;">
    <Navbar/>
    <div
      class="p-2 bd-highlight d-flex flex-column ms-5"
      style="min-height: 20rem;"
    >
      <div
        class="container-fluid text-center"
      >
        <h4 class="heading m-0">List of candidates for Regional Head</h4>
      </div>
      <div class="container-fluid p-5">
        <div class="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-6 g-4">
        <CardCalon v-for="profile in profiles" :key="profile.id" :profile="profile"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CardCalon from '../components/CardCalon'
export default {
  name: 'Home',
  components: {
    Navbar,
    CardCalon
  },
  created () {
    this.$store.dispatch('fetchAllVerified')
  },
  computed: {
    profiles () {
      return this.$store.state.profiles
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>
  @import '../assets/styles/CardCalon.css';
  /* .list-room {
    text-align: justify;
  } */
</style>