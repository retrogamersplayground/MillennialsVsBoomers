<template>
  <div>
    <div class="container">
      <div class="">
        <div class="">
          <div class="login">
            <h3>Reset Password</h3>
            <form>
              <div class="">
                <input type="text" id="email" v-model="email" />
                <label class="white-text" for="email">Email</label>
              </div>
              <button v-on:click="reset" class="">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'reset',
  data: function () {
    return {
      email: ''
    }
  },
  methods: {
    reset: function (e) {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function () {
          // Email sent.
          alert('Reset Password Email Sent')
        })
        .catch(function (error) {
          // An error happened.
          console.log(error)
        })
      e.preventDefault()
    }
  }
}
</script>
