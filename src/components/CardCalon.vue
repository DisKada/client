<template>
  <div class="card shadow rounded-3 p-0 m-2" style="min-height: 15rem;">
      <img
        :src="profile.image"
        class="card-img-top img-costum rounded"
        alt="Gambar Calon"
        @click="toDetailCalon(profile.id)"
        style="cursor: pointer;"
      />
    <div class="card-body d-flex flex-column justify-content-center align-items-center p-1">
      <p class="card-title p-costum text-center">{{profile.username}}</p>
      <p class="card-text p-costum text-center" style="font-size: 0.8rem; color: #78909C">{{profile.calon}}</p>
    </div>
    <!-- <div class="d-grid gap-2 col-8 mx-auto mb-1">
      <button class="btn btn-secondary btn-sm" type="button" @click="toDetailCalon(profile.id)">Detail</button>
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    toDetailCalon (id) {
      this.$store.dispatch('getDetail', id)
    }
  },
  name: 'CardCalon',
  props: ['profile']
}
</script>

<style scoped>
  @import '../assets/styles/newCss.css';

</style>
