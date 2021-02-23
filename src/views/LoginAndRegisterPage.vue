<template>
    <div class="loginAndRegisterBox">
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" v-model="userRegist.username"/>
                    <input type="email" placeholder="Email" v-model="userRegist.email" />
                    <input type="password" placeholder="Password" v-model="userRegist.password" />
                    <button @click.prevent="toLogin">Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" v-model="user.email" />
                    <input type="password" placeholder="Password" v-model="user.password"/>
                    <button @click.prevent="toHome">Sign In</button>
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
  name: 'login&register',
  data () {
    return {
      userRegist: {
        username: '',
        email: '',
        password: ''
      },
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    toLogin () {
      console.log('masuk sini')
      this.$store.dispatch('register', this.userRegist)
    },
    toHome () {
      // console.log('masuk sini')
      this.$store.dispatch('login', this.user)
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

<style scoped>
  @import '../assets/styles/Login&Register.css';
</style>
