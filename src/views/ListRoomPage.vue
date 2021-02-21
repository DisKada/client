<template>
  <div>
      <Navbar/>
      <h1>List Room</h1>
      <div class="listRoom">
          <ol class="articles">
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          <RoomCard/>
          </ol>
          <div class="createRoom">
            <button @click="createRoom" class="buttonCreateRoom">create room</button>
          </div>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'

export default {
  name: 'ListRoom',
  components: {
    RoomCard,
    Navbar
  },
  methods: {
    toRoom () {
      this.$router.push({ path: '/room/:id' })
    },
    async createRoom () {
      const { value: formValues } = await Swal.fire({
        title: 'Buat Room',
        html:
          '<label>Nama Room</label>' +
          '<input id="swal-input1" class="swal2-input">' +
          '<label>Jumlah Maksimal Peserta</label>' +
          '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
    }
  }
}
</script>

<style>
    @import '../assets/styles/ListRoom.css';
    @import '../assets/styles/CardRoom.css';
    .listRoom {
      margin-bottom: -50%;
      display: flex;
      flex-direction: row;
    }

    .createRoom {
      justify-content: center;
      margin-top: 30px;
    }
    .buttonCreateRoom{
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
      opacity: 0.7;
      transition: 0.5s;
    }
    .buttonCreateRoom:hover{
      transition: 0.5s;
      opacity: 1;
      transform: scale(1.3);
    }
    .buttonCreateRoom:active{
      transform: scale(1);
    }
</style>
