<template>
  <div>
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
