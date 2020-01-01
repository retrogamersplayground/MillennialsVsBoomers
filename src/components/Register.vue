<template>
  <div>
    <app-navigation></app-navigation>
    <div class="container">
      <div class="">
        <div class="">
          <div class="login">
            <h3>Register</h3>
            <form>
              <div class="">
                <input type="text" id="email" v-model="email" />
                <label for="email">Email</label>
              </div>
              <div class="input-field">
                <input type="text" id="password" v-model="password" />
                <label for="email">Password</label>
              </div>
              <button v-on:click="register" class="">Register</button>
            </form>
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
.welcomeDiv {
  background-color: #E38120;
  color: white;
}
</style>
