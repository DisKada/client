<template>
  <div>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click="toListCalon">
            <svg height="5vh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-friends" class="svg-inline--fa fa-user-friends fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>
            <br>
            <span class="link-text">Candidates</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" @click="toListRoom">
            <svg height="5vh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="door-open" class="svg-inline--fa fa-door-open fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z"></path></svg>
            <br>
            <span class="link-text">Rooms</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" @click="toProfile">
            <svg height="7vh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
            <br>
            <span class="link-text">Profile</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout">
             <svg height="6vh" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
             <br>
             <span class="link-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    toListCalon () {
      this.$router.push({ path: '/' })
    },
    toProfile () {
      this.$router.push({ path: `/profile/${localStorage.getItem('userId')}` })
    },
    toListRoom () {
      this.$router.push({ path: '/rooms' })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
    @import '../assets/styles/Navbar.css';
</style>
