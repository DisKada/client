<template>
  <div>
    <div class="card">
        <div class="banner">
            <img :src="profile.image">
        </div>
        <div class="menu">
        </div>
        <h2 class="name">{{profile.username}}</h2>
        <div class="title">{{profile.calon}}</div>
        <div class="actions">
            <div class="follow-btn">
            <button @click="toDetailCalon(profile.id)">Detail</button>
            </div>
        </div>
        <div class="desc">{{profile.visi}}</div>
        </div>
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

<style>

</style>
