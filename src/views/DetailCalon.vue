<template>
<div>
  <Navbar/>
  <div class="detail">
    <div class="d-flex flex-column bd-highlight" style="min-height: 100vh;">
      <div class="px-5 mt-5 mb-2 bd-highlight ms-5">
        <div class="container-fluid">
          <div class="row rounded rounded-3 shadow" style="border: 0.1rem solid #E57373;">
            <div class="col-3">
              <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
                <img
                  :src="getDetail.image"
                  class="card-img-top img-costum rounded"
                  alt="Gambar Calon Kepala Daerah"
                />
              </div>
            </div>
            <div class="col-5">
              <div class="card-body d-flex flex-column pt-5 mt-2">
                <p class="card-title p-costum m-0 h4 mb-1">{{getDetail.username}}</p>
                <p class="card-text p-costum m-0 h5 mb-2">{{getDetail.calon}}</p>
                <p class="card-text p-costum m-0 h5">{{getDetail.partai}}</p>
              </div>
            </div>
            <div class="col-4">
              <div class="card-body d-flex flex-column pt-5 mt-2">
                <p class="card-title p-costum h5 m-0">Date of birth</p>
                <p class="card-text p-costum m-0 mb-2">{{getDetail.tempat_lahir}} {{getDetail.tanggal_lahir}}</p>
                <p class="card-title p-costum h5 m-0">Education</p>
                <p class="card-text p-costum m-0 mb-2">{{getDetail.pendidikan}}</p>
                <p class="card-title p-costum h5 m-0">Profession</p>
                <p class="card-text p-costum m-0 mb-2">{{getDetail.pekerjaan}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 bd-highlight ms-5 my-2">
        <div class="container-fluid">
          <div class="row rounded rounded-3 shadow" style="min-height: 30vh; border: 0.1rem solid #E57373;">
            <div class="col-6">
              <div class="card-body d-flex flex-column">
                <p class="card-title p-costum m-0 h5 mb-1">Vision</p>
                <p class="card-text p-costum m-0 mb-2">{{getDetail.visi}}</p>
              </div>
            </div>
            <div class="col-6">
              <div class="card-body d-flex flex-column">
                <p class="card-title p-costum m-0 h5 mb-1">Mission</p>
                <p class="card-text p-costum m-0 mb-2">{{getDetail.misi}}</p>
              </div>
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
  @import '../assets/styles/newCss.css';
  .detail {
    text-align: justify;
  }
</style>