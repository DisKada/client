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
                    <input type="text" v-model="getEdit.username">
                </div>
                <div class="userMisi">
                    <label type="text" for="image"> image :</label>
                    <input type="text" v-model="getEdit.image">
                </div>
                <div v-if="getEdit.status === 'verified'">
                <div class="userEmail">
                    <label type="text" for="calon"> Bakal Calon :</label>
                    <input type="text" v-model="getEdit.calon">
                </div>
                <div class="userEmail">
                    <label type="text" for="partai"> partai :</label>
                    <input type="text" v-model="getEdit.partai">
                </div>
                <div class="userVisi">
                    <label type="text" for="visi"> visi :</label>
                    <input type="text" v-model="getEdit.visi">
                </div>
                <div class="userMisi">
                    <label type="text" for="pekerjaan"> pekerjaan :</label>
                    <input type="text" v-model="getEdit.pekerjaan">
                </div>
                <div class="userMisi">
                    <label type="text" for="pendidikan"> pendidikan :</label>
                    <input type="text" v-model="getEdit.pendidikan">
                </div>
                </div>
                <button type="submit" @click.prevent="edit(getEdit.id)">edit</button>
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
  name: 'EditCalon',
  components: {
    Navbar
  },
  methods: {
    edit (id) {
      this.$store.dispatch('edit', id)
    }
  },
  computed: {
    getEdit () {
      return this.$store.state.getEdit
    }
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
