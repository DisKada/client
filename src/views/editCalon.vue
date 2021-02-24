<template>
  <div class="edit-profile">
    <Navbar/>
    <div class="container-fluid ps-5">
      <div class="row" style="min-height: 100vh">
        <div class="col-8 d-flex flex-column align-items-center justify-content-evenly mx-auto my-3" style="border: 0.1rem solid #E57373;">
           <div class="container-lg mt-1 mb-2">
            <label for="nameId" class="form-label m-0 text-muted heading">
              Nama
            </label>
            <input
              type="text"
              class="form-control"
              id="nameId"
              name="name"
              v-model="getEdit.username"
              required
            />
          </div>
           <div class="container-lg mb-2">
            <label for="imageId" class="form-label m-0 text-muted heading">
              Foto
            </label>
            <input
              type="file"
              class="form-control"
              id="imageId"
              name="image"
              @change="previewImage"
              accept="image/*"
              ref="uploadImage"
            />
          </div>
           <div v-if="getEdit.status === 'verified'" class="container-lg mb-2">
            <label for="partaiId" class="form-label m-0 text-muted heading">
              Partai Pengusung
            </label>
            <input
              type="text"
              class="form-control"
              id="partaiId"
              name="partai"
              v-model="getEdit.partai"
            />
          </div>
          <div v-if="getEdit.status === 'verified'" class="container-lg mb-2">
            <label for="calonId" class="form-label m-0 text-muted heading">
              Daerah Pencalonan
            </label>
            <input
              type="text"
              class="form-control"
              id="calonId"
              name="calon"
              v-model="getEdit.calon"
              required
            />
          </div>
          <div class="container-lg mb-2">
            <label for="tempat_lahirId" class="form-label m-0 text-muted heading">
              Tempat Lahir
            </label>
            <input
              type="text"
              class="form-control"
              id="tempat_lahirId"
              name="tempat_lahir"
              v-model="getEdit.tempat_lahir"
            />
          </div>
          <div class="container-lg mb-2">
            <label for="tanggal_lahirId" class="form-label m-0 text-muted heading">
              Tanggal Lahir
            </label>
            <input
              type="date"
              class="form-control"
              id="tanggal_lahirId"
              name="tanggal_lahir"
              v-model="getEdit.tanggal_lahir"
            />
          </div>
          <div class="container-lg mb-2">
            <label for="pendidikanId" class="form-label m-0 text-muted heading">
              Pendidikan
            </label>
            <input
              type="text"
              class="form-control"
              id="pendidikanId"
              name="pendidikan"
              v-model="getEdit.pendidikan"
            />
          </div>
          <div class="container-lg mb-2">
            <label for="pekerjaanId" class="form-label m-0 text-muted heading">
              Pekerjaan
            </label>
            <input
              type="text"
              class="form-control"
              id="pekerjaanId"
              name="pekerjaan"
              v-model="getEdit.pekerjaan"
            />
          </div>
          <div v-if="getEdit.status === 'verified'" class="container-lg mb-2">
            <label for="visiId" class="form-label text-muted heading">
              Visi
            </label>
            <textarea
              class="form-control"
              id="visiId"
              rows="5"
              name="visi"
              v-model="getEdit.visi"
            ></textarea>
          </div>
          <div v-if="getEdit.status === 'verified'" class="container-lg mb-2">
            <label for="misiId" class="form-label text-muted heading">
              Misi
            </label>
            <textarea
              class="form-control"
              id="misiId"
              rows="5"
              name="misi"
              v-model="getEdit.misi"
            ></textarea>
          </div>
            <div class="container-lg mb-3">
              <div class="d-grid gap-2 mx-auto col-4">
                <button
                  type="button"
                  class="btn btn-secondary p-font"
                   @click.prevent="edit(getEdit.id)"
                >
                  Submit
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
        this.$store.commit('uploadImg', this.getEdit.image)
        this.$store.dispatch('edit', id)
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
  @import '../assets/styles/newCss.css';
  .edit-profile {
    text-align: justify;
  }
</style>
