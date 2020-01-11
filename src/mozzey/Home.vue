<template>
  <div class="home">
    <div class="showcaseDiv">
      <h2>
        The trivia game where millennials go head to head with baby boomers
      </h2>
      <p>Players answer ten questions to see which side will win!</p>
    </div>
    <div class="homeImages">
      <h2 class="chooseH2">Choose Your Side</h2>
      <app-team-card :pickTeam="pickTeam" :teamId="teamId" team="Millennials" />
      <app-team-card :pickTeam="pickTeam" :teamId="teamId" team="Boomers" />
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import TeamCard from "./TeamCard";
import firebase from "firebase";
import db from "../components/firebaseInit";

export default {
  components: {
    "app-navigation": Navigation,
    "app-team-card": TeamCard
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      uid: null,
      teamId: null
    };
  },
  methods: {
    async pickTeam(team = "") {
      try {
        const res = await db.collection(team).add({ teamId: this.teamId });
        // const name = team.toLowerCase().replace("s", "");

        this.$router.push({
          name: "Player",
          params: {
            user: this.user,
            teamName: team.replace("s", ""),
            teamId: this.teamId
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
.homeImages {
  width: 100%;
  background-color: #388e3c;
  color: white;
}
.welcomeDiv {
  background-color: #388e3c;
  color: white;
}
.showcaseDiv h2 {
  margin-top: 50px;
}
.showcaseDiv p {
  margin-top: 20px;
  margin-bottom: 50px;
}

.chooseH2 {
  font-size: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.homeButton {
  text-align: right;
}
</style>
