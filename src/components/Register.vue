<template>
  <div class="register">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>The trivia game where millennials go head to head with baby boomers</h2>
      <p>Players answer ten questions to see which side will win!</p>
    </div>
    <div class="container">
      <div class="">
        <div class="">
          <div class="">
            <form>
              <h3>Register</h3>
              <div class="">
                <input type="text" id="email" placeholder="Email" v-model="email" />
              </div>
              <div class="input-field">
                <input type="text" id="password" placeholder="Password" v-model="password" />
              </div>
              <button v-on:click="register" class="">Register</button>
            </form>
            <router-link to="/" tag="h6">Login</router-link>
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
  name: 'register',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    'app-navigation': Navigation
  },
  methods: {
    register: function (e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${this.email}`)
            this.$router.go({ path: this.$router.path })
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.register {
  text-align: center;
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
</style>
