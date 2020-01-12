<template>
  <div class="login">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>The trivia game where millennials go head to head with baby boomers</h2>
      <p>Players answer ten questions to see which side will win!</p>
    </div>
    <div class="container">
      <div class="">
        <div class="">
          <div class="login">
            <form>
              <h3>Login</h3>
              <div class="">
                <input type="text" id="email" placeholder="Email" v-model="email" />
              </div>
              <div class="">
                <input type="text" id="password" placeholder="Password" v-model="password" />
              </div>
              <button v-on:click="login" class="">Login</button>
            </form>
            <router-link to="/register" tag="h6">Sign Up</router-link>
            <router-link to="/reset" tag="h6">Forgot Your Password?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function (e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${this.email}`)
            this.$router.go({ path: this.$router.path })
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>

<style scoped>
.login {
  text-align: center
}
.welcomeDiv {
  background-color: #388e3c;
  color: white;
}
.showcaseDiv h2{
  margin-top: 50px;
}
.showcaseDiv p {
  margin-top: 20px;
  margin-bottom: 50px;
}
h3 {
  text-align: center;
  color: #ffffff;
  padding-top: 20px;
}
form {
  background-color: #388e3c;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
input {
  padding: 15px;
  margin-top: 20px;
  width: 80%;
}
button {
  background-color: #ffffff;
  color: #388e3c;
  border: none;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 150px;
}
router-link {
  color: #ffffff;
}
</style>
