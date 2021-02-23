<template>
  <div class="profileUser">
    <Navbar/>
    <div class="userProfileBoard col-12">
        <h1>Calon Profile</h1>
      <div class="userProfileBox">
        <div  class="userData">
          <img :src="getDetail.image" >
          <div class="userInformation">
            <div class="userName">
              <h1>{{getDetail.username}}</h1>
            </div>
            <div class="BakalCalon">
              <label for="Bakal Calon"> Bakal Calon :</label>
              <p>{{getDetail.calon}}</p>
            </div>
            <div class="userVisi">
              <label for="visi"> visi :</label>
              <p>{{getDetail.visi}}</p>
            </div>
            <div class="userMisi">
              <label for="misi"> misi :</label>
              <p>{{getDetail.misi}}</p>
            </div>
            <div class="partai">
              <label for="partai"> partai :</label>
              <p>{{getDetail.partai}}</p>
            </div>
            <div class="pendidikan">
              <label for="pendidikan"> pendidikan :</label>
              <p>{{getDetail.pendidikan}}</p>
            </div>
            <div class="pekerjaan">
              <label for="pekerjaan"> pekerjaan :</label>
              <p>{{getDetail.pekerjaan}}</p>
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
  name: 'DetailCalon',
  components: {
    Navbar
  },
  methods: {
  },
  computed: {
    getDetail () {
      return this.$store.state.getDetail
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
