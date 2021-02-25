<template>
  <div>
      <Navbar/>
      <h4 class="heading pt-5">List Room</h4>
      <div class="listRoom" v-if="rooms.length !== 0">
          <ol class="articles">
          <RoomCard v-for="(room) in rooms" :key="room.id" :peer="peer" :peerId='peerId' :room="room" />
          </ol>
          <div class="createRoom" v-if="profile.status === 'verified'">
            <button @click.prevent="createRoom" class="buttonCreateRoom">create room</button>
          </div>
      </div>
      <div class="listRoom mt-5" v-else>
        <div class="articles d-flex flex-column">
         <h4 class="heading">There's No Rooms Available</h4>
         <div class="noRoom"></div>
        </div>
         <div class="createRoom" v-if="profile.status === 'verified'">
            <button @click.prevent="createRoom" class="buttonCreateRoom">create room</button>
          </div>
      </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'
import { mapState, mapMutations } from 'vuex'
import { v4 as uuidV4 } from 'uuid'
export default {
  props:['peer','peerId'],
  created () {
    this.$store.commit('resetState')
    this.listRoom()
    this.$store.dispatch('fetchProfile')
  },
  name: 'ListRoom',
  data () {
    return {
      roomName: '',
      roomList: [],
      palyerName: localStorage.getItem('username')
    }
  },
  components: {
    RoomCard,
    Navbar
  },
  computed: {
    ...mapState(['myName']),
    rooms () {
      return this.$store.state.rooms
    },
    showError () {
      return this.$store.state.errorMsg
    },
    profile () {
      return this.$store.state.profile
    },
    buttonJOin () {
      return this.$store.state.buttonJoin
    }
  },
  methods: {
    ...mapMutations(['setMyName']),
    listRoom () {
      this.$socket.emit('get-rooms')
      this.setMyName(this.palyerName)
    },
    async createRoom () {
      const { value: formValues } = await Swal.fire({
        title: 'Buat Room',
        html:
          '<label>Nama Room</label>' +
          '<input id="swal-input1" class="swal2-input">', 
          // '<label>Jumlah Maksimal Peserta</label>' +
          // '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            // document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
      const payload = {
        name: formValues[0] + '-' + uuidV4(),
        creator: this.myName,
        // max: Number(formValues[1])
      }
      this.$socket.emit('create-room', payload, this.peerId)
    }
  },
  destoyed () {
    this.$socket.off('get-rooms')
    this.$socket.off('roomCreated')
    this.$socket.off('getInToRoom')
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
