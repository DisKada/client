<template>
<div>
  <Navbar/>
  <div class="user-profile">
    <div class="container-fluid ps-5">
      <div class="row" style="min-height: 100vh">
        <div class="col-4 d-flex flex-column align-items-center justify-content-center" style="border-right: 0.1rem solid #FFCDD2;">
          <img
            :src="profile.image"
            class="img-fluid ms-5 p-4"
            alt="User Pict"
            style="max-height: 80vh; min-height: 50vh;"
          />
        </div>
        <div class="col-8 d-flex flex-column align-items-center justify-content-evenly">
          <div class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Name</h5>
            <p class="m-1 p-costum">{{profile.username}}</p>
          </div>
          <div v-if="profile.status === 'verified'" class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Area</h5>
            <p class="m-1 p-costum">{{profile.calon}}</p>
          </div>
          <div v-if="profile.status === 'verified'" class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Party</h5>
            <p class="m-1 p-costum">{{profile.partai}}</p>
          </div>
          <div class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Date of birth</h5>
            <p class="m-1 p-costum">{{profile.tempat_lahir}} {{profile.tanggal_lahir}}</p>
          </div>
          <div class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Education</h5>
            <p class="m-1 p-costum">{{profile.pendidikan}}</p>
          </div>
          <div class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Profession</h5>
            <p class="m-1 p-costum">{{profile.pekerjaan}}</p>
          </div>
          <div v-if="profile.status === 'verified'" class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Vision</h5>
            <p class="m-1 p-costum">{{profile.visi}}</p>
          </div>
          <div v-if="profile.status === 'verified'" class="container-lg mb-3" style="border-bottom: 0.1rem solid #FFCDD2;">
            <h5 class="m-1 text-muted heading">Mission</h5>
            <p class="m-1 p-costum">{{profile.misi}}</p>
          </div>
            <div class="container-lg mb-3">
              <div class="d-grid gap-2 d-md-block">
                <button
                  type="button"
                  class="btn btn-secondary ms-1 p-font"
                  @click="toEditUser(profile.id)"
                >
                  Update
                </button>
              </div>
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
  },
  methods: {
    toEditUser (id) {
      this.$store.dispatch('getEdit', id)
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

<style scoped>
  @import '../assets/styles/newCss.css';
  .user-profile {
    text-align: justify;
  }
  /* .profileUser {
    margin-bottom: -50%;
  } */
</style>