<template>
  <div class="boomer">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>Ok Boomer!</h2>
    </div>
    <div class="boomerImages">
      <h2 class="boomerFont">BOOMER</h2>
      <div class="boomerImage">
        <img src="@/assets/boomer.png" alt="boomer" />
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
  name: 'Boomer',
  data() {
    return {
      user: firebase.auth().currentUser,
      uid: null,
      teamId2: null,
      lobbyId: null
    }
  },
  methods: {
    addLobbyId() {
      if (this.user != null) {
        db.collection('boomers')
          .add({
            lobbyId: this.lobbyId
          })
          .then(() => {
            this.$router.push({
              name: 'Game',
              params: { lobbyId: this.lobbyId }
            })
          })
          // eslint-disable-next-line
          .catch(error => console.log(err))
      }
    }
  },
  created() {
    if (this.user != null) {
      this.uid = this.user.uid
      this.teamId2 = this.$route.params.teamId2
      this.lobbyId =
        this.teamId2 + '_' + +Math.round(new Date().getTime() / 1000)
    }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boomer {
  text-align: center;
}
.welcomeDiv {
  background-color: #e38120;
  color: white;
}
.showcaseDiv h2 {
  margin-top: 50px;
}
.boomerImages {
  width: 100%;
  background-color: #e38120;
  color: white;
}
.boomerImage {
  width: 45%;
  display: inline-block;
}
.chooseH2 {
  font-size: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.boomerImage img {
  width: 70%;
}
button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: block;
  padding: 20px 50px 20px;
  background-color: #ffffff;
  color: #e38120;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
button:hover {
  background-color: #e38120;
  color: #ffffff;
}
</style>
