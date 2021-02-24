<template>
  <div class="user-profile">
    <Navbar/>
    <div class="container-fluid">
      <div class="row" style="min-height: 50vh">
        <div class="col-4 d-flex flex-column align-items-center justify-content-center rounded-3">
          <img
            :src="profile.image"
            class="img-fluid shadow rounded-3 ms-5"
            alt="User Pict"
            style="background-color: #CFD8DC; border-style: solid; max-height: 80vh; min-height: 50vh;"
          />
        </div>
        <div class="col-8 d-flex flex-column align-items-center justify-content-evenly">
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Nama</h5>
            <p class="m-1 p-costum">{{profile.username}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Daerah Pencalonan</h5>
            <p class="m-1 p-costum">{{profile.calon}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Partai Pengusung</h5>
            <p class="m-1 p-costum">{{profile.partai}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Tempat, Tanggal Lahir</h5>
            <p class="m-1 p-costum">{{profile.tempat_lahir}}, {{profile.tanggal_lahir}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Pendidikan</h5>
            <p class="m-1 p-costum">{{profile.pendidikan}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Pekerjaan</h5>
            <p class="m-1 p-costum">{{profile.pekerjaan}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Visi</h5>
            <p class="m-1 p-costum">{{profile.visi}}</p>
          </div>
          <div class="container-lg mb-3 border-bottom">
            <h5 class="m-1 text-muted heading">Misi</h5>
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

<style scopped>
  @import '../assets/styles/newCss.css';
  .user-profile {
    text-align: justify;
  }
  /* .profileUser {
    margin-bottom: -50%;
  } */
</style>
