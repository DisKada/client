<template>
  <div class="profileUser">
    <Navbar/>
    <div class="userProfileBoard col-12">
      <div class="userProfileBox">
        <div  class="userData">
          <img src="https://mojok.co/terminal/wp-content/uploads/2019/11/deddy-800x540.jpg" >
          <div class="userInformation">
            <div class="userName">
              <h1>Om botak</h1>
            </div>
            <div class="userEmail">
              <label for="email"> email :</label>
              <p>botakseng@gmail.com</p>
            </div>
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
  }
}
</script>

<style>
  @import '../assets/styles/ProfileUser.css';
  .profileUser {
    margin-bottom: -50%;
  }
</style>
