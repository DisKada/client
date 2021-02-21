<template>
    <div class="loginAndRegisterBox">
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form @submit.prevent="register">
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input type="text" v-model="userRegist.username" placeholder="Name" />
                    <input type="email" v-model="userRegist.email" placeholder="Email" />
                    <input type="password" v-model="userRegist.password" placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input type="email" v-model="user.email" placeholder="Email" />
                    <input type="password" v-model="user.password" placeholder="Password" />
                    <button @click.prevent="login">Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button class="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      userRegist: {
        email: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
      this.$socket.emit('login', this.user.email)
    },
    register () {
      this.$store.dispatch('register', this.userRegist)
    }
  },
  mounted () {
    var signUpButton = document.getElementById('signUp')
    var signInButton = document.getElementById('signIn')
    var container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
    })
  }
}
</script>

<style>
  @import '../assets/styles/Login&Register.css';
</style>
