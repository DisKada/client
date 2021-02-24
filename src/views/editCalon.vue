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
                <div>
                  <label>Change image</label>
                  <input type="file" @change="previewImage" accept="image/*" class="form-control" ref="uploadImage">
                </div>
                <!-- <button @click.prevent="onUpload" class="btn btn-success">Upload</button> -->
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
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  name: 'EditCalon',
  components: {
    Navbar
  },
  methods: {
    edit (id) {
      if ((this.fileType === 'image/png' || this.fileType === 'image/jpg' || this.fileType === 'image/jpeg') && this.fileSize <= 200_000) {
        const storageRef = firebase.storage().ref(`${new Date().getTime()}-${this.imageData.name}`).put(this.imageData)
        storageRef.on('state_changed', snapshot => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, error => { console.log(error.message) },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            // Hasil dari proses menyimpan ke firebase berupa url
            // url ini yang ditampilkan menjadi picture
            this.$store.commit('uploadImg', url)
            this.$store.dispatch('edit', id)
            console.log(url)
            this.$refs.uploadImage.value = null
          })
        })
      } else {
        console.log('file type must be png/jpg/jpeg and image size too more than 100Kb')
      }
    },
    previewImage (event) {
      this.uploadValue = 0
      this.imageData = event.target.files[0]
      this.fileType = event.target.files[0].type
      this.fileSize = event.target.files[0].size
      console.log(event.target.files[0])
    }
    // onUpload () {
    //   // Kondisi jika file bukan png/jpg/jpeg dan tidak lebih dari 100Kb
    // }
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
