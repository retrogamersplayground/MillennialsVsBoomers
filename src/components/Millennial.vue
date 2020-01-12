<template>
  <div class="millennial">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>Ok Snowflake!</h2>
    </div>
    <div class="millennialImages">
      <h2 class="millennialFont">Millennial</h2>
      <div class="millennialImage">
          <img src="@/assets/millennial.png" alt="millennial" />
      </div>
      <form @submit.prevent="addLobbyId">
        <input disabled type="hidden" v-model="lobbyId" id="lobbyId" required />
        <button type="submit">Play</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import firebase from 'firebase'
import db from './firebaseInit'
export default {
  name: 'Millennial',
  data () {
    return {
      user: firebase.auth().currentUser,
      uid: null,
      teamId: null,
      lobbyId: null
    }
  },
  methods: {
    addLobbyId () {
      if (this.user != null) {
        db.collection('millennials')
          .add({
            lobbyId: this.lobbyId
          })
          .then(() => {this.$router.push({
            name: 'Game',
            params: {lobbyId: this.lobbyId}
          })})
          // eslint-disable-next-line
          .catch(error => console.log(err))
      }
    }
  },
  created () {
     if (this.user != null) {
        this.uid = this.user.uid
        this.teamId = this.$route.params.teamId
        this.lobbyId = this.teamId + '_' + + Math.round(new Date().getTime() / 1000)
      }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.millennial {
  text-align: center;
}
.welcomeDiv {
  background-color: #6775B6;
  color: white;
}
.showcaseDiv h2{
  margin-top: 50px;
  margin-bottom: 50px;
}
.millennialImages {
  width: 100%;
  background-color: #6775B6;
  color: white;
}
.millennialImage {
  width: 40%;
  display: inline-block;
}
.millennialImages h2 {
  padding-top: 20px;
}
.millennialImage img {
  width: 70%;
}
button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: block;
  padding: 20px 50px 20px;
  background-color: #ffffff;
  color: #6775b6;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
button:hover {
    background-color: #6775b6;
    color: #ffffff;
}
form {
  padding-bottom: 50px;
}
</style>
