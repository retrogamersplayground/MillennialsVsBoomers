<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel green white-text center">
            <h3>Reset Password</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" id="email" v-model="email" />
                <label class="white-text" for="email">Email</label>
              </div>
              <button v-on:click="reset" class="btn btn-large grey lighten-4 black-text">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "reset",
  data: function() {
    return {
      email: ""
    };
  },
  methods: {
    reset: function(e) {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function() {
          // Email sent.
          alert("Reset Password Email Sent");
        })
        .catch(function(error) {
          // An error happened.
        });
      e.preventDefault();
    }
  }
};
</script>