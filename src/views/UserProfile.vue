<template>
  <div class="profileUser">
    <Navbar/>
    <div class="userProfileBoard col-12">
      <h1>User Profile</h1>
      <div class="userProfileBox">
        <div  class="userData">
          <img src="https://mojok.co/terminal/wp-content/uploads/2019/11/deddy-800x540.jpg" >
          <div class="userInformation">
            <div class="userName">
              <h1>{{profile.username}}</h1>
            </div>
            <div class="userEmail">
              <label for="email"> email :</label>
              <p>{{profile.email}}</p>
            </div>
            <button @click="toEditUser">edit</button>
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
    toEditUser () {
      this.$router.push({ path: '/edit/user/:id' })
    }
  },
  created () {
    this.$store.dispatch('fetchProfile')
  },
  computed: {
    profile () {
      return this.$store.state.profile
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
