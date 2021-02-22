<template>
  <div class="home">
    <Navbar/>
    <h1>List Calon</h1>
    <div class="ListCalonBox" v-if="isLoading === false">
        <CardCalon v-for="profile in profiles" :key="profile.id" :profile="profile"/>
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
  .ListCalonBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    flex-wrap: wrap;
    flex-grow: 1;
    margin-bottom: -50%;
  }
</style>
