<template>
  <div class="profileUser">
    <Navbar/>
    <div class="userProfileBoard col-12">
      <h1>Edit Calon Profile</h1>
      <div class="userProfileBox">
        <div  class="userData">
          <div class="userInformation">
            <form>
                <div class="userName">
                    <label for="name"> name :</label>
                    <input type="text">
                </div>
                <div class="userEmail">
                    <label type="text" for="email"> email :</label>
                    <input>
                </div>
                <div class="userVisi">
                    <label type="text" for="visi"> visi :</label>
                    <input>
                </div>
                <div class="userMisi">
                    <label type="text" for="misi"> misi :</label>
                    <input>
                </div>
                <button type="submit">edit</button>
            </form>
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
  label {
    color: black
  }
</style>
