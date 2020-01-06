<template>
  <div class="home">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>The trivia game where millennials go head to head with baby boomers</h2>
      <p>Players answer ten questions to see which side will win!</p>
    </div>
    <div class="homeImages">
      <h2 class="chooseH2">Choose Your Side</h2>
      <div class="homeImage">
        <form @submit.prevent="chooseTeamMillennials">
          <input disabled type="hidden" v-model="teamId" id="teamId" required />
          <button type="submit">
            <div>
              <img src="@/assets/millennial.png" alt="millennial" />
              <h2 class="millennialFont">Millennial</h2>
            </div>
          </button>
        </form>
      </div>
      <div class="homeImage">
        <form @submit.prevent="chooseTeamBoomers">
          <input disabled type="hidden" v-model="teamId2" id="teamId2" required />
          <button type="submit">
            <div>
              <img src="@/assets/boomer.png" alt="boomer" />
              <h2 class="boomerFont">BOOMER</h2>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import firebase from 'firebase'
import db from './firebaseInit'
export default {
  name: 'Home',
  data () {
    return {
      user: firebase.auth().currentUser,
      uid: null,
      teamId: null,
      teamId2: null
    }
  },
  methods: {
    chooseTeamMillennials () {
      db.collection('millennials')
        .add({
          teamId: this.teamId
        })
        .then(() => {this.$router.push({
          name: 'Millennial',
          params: {teamId: this.teamId}
        })})
        // eslint-disable-next-line
        .catch(error => console.log(err))
    },
    chooseTeamBoomers () {
      db.collection('boomers')
        .add({
          teamId2: this.teamId2
        })
        .then(() => {this.$router.push({
          name: 'Boomer',
          params: {teamId2: this.teamId2}
        })})
        // eslint-disable-next-line
        .catch(error => console.log(err))
    }
  },
  created () {
     if (this.user != null) {
        this.uid = this.user.uid
        this.teamId = 'millennial_' + this.uid
        this.teamId2 = 'boomer_' + this.uid
      }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
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
.homeImages {
  width: 100%;
  background-color: #388e3c;
  color: white;
}
.homeImage {
  width: 45%;
  display: inline-block;
}
.chooseH2 {
  font-size: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.homeImage img {
  width: 80%;
}
.homeButton {
  text-align: right;
}
button {
  background-color: #388e3c;
  border: none;
}
</style>
