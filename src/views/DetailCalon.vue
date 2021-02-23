<template>
  <div class="profileUser">
    <Navbar/>
    <div class="userProfileBoard col-12">
        <h1>Calon Profile</h1>
      <div class="userProfileBox">
        <div  class="userData">
          <img src="https://mojok.co/terminal/wp-content/uploads/2019/11/deddy-800x540.jpg" >
          <div class="userInformation">
            <div class="userName">
              <h1>Om botak</h1>
            </div>
            <div class="userVisi">
              <label for="visi"> visi :</label>
              <p>mensejahterakan bangsa</p>
            </div>
            <div class="userMisi">
              <label for="misi"> misi :</label>
              <p>mensejahterakan bangsa</p>
            </div>
            <button @click="toEditCalon">edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'UserProfile',
  components: {
    Navbar
  },
  methods: {
    toEditCalon () {
      this.$router.push({ path: '/edit/calon/:id' })
    }
  }
}
</script>

<style>
  @import '../assets/styles/ProfileUser.css';
  .profileUser {
    margin-bottom: -50%;
  }
</style>
