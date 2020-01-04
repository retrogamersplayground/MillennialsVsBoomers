<template>
  <div>
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>The trivia game where millennials go head to head with baby boomers</h2>
      <p>Players answer ten questions to see which side will win!</p>
    </div>
    <div class="container">
      <div class="">
        <div class="">
          <div class="login">
            <h3>Login</h3>
            <form>
              <div class="">
                <input type="text" id="email" v-model="email" />
                <label class="" for="email">Email</label>
              </div>
              <div class="">
                <input type="text" id="password" v-model="password" />
                <label class="" for="email">Password</label>
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
  }
}
</script>

<style scoped>
router-link {
  color: #ffffff;
}
</style>
