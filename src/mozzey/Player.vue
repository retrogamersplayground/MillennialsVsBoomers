<template>
  <div :class="team.toLowerCase()">
    <div class="showcaseDiv">
      <h2>Ok {{ team }}!</h2>
    </div>
    <div :class="team === 'Boomer' ? 'boomerImages' : 'millennialImages'">
      <h2 :class="team === 'Boomer' ? 'boomerFont' : 'millennialFont'">
        BOOMER
      </h2>
      <div :class="team === 'Boomer' ? 'boomerImage' : 'millennialImage'">
        <img :src="getImg" alt="boomer" />
      </div>
      <form @submit.prevent="addLobbyId">
        <input disabled type="hidden" v-model="lobbyId" id="lobbyId" required />
        <button type="submit">Play</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import db from "../components/firebaseInit";

export default {
  data() {
    return {
      lobbyId: `${this.$route.params.teamId}_${Math.round(
        new Date().getTime() / 1000
      )}`,
      team: this.$route.params.teamName,
      teamId: this.$route.params.teamId,
      user: this.$route.params.user
    };
  },
  components: {
    "app-navigation": Navigation
  },
  created() {
    console.log(this.$route);
  },
  computed: {
    getImg() {
      return require(`@/assets/${this.team
        .toLowerCase()
        .replace("s", "")}.png`);
    }
  },
  methods: {
    async addLobbyId() {
      const res = await db.collection(this.team).add({
        lobbyId: this.lobbyId
      });

      this.$router.push({
        name: "Game",
        params: {
          lobbyId: this.lobbyId,
          playerType: "boomer",
          teamName: this.team
        }
      });
    }
  }
};
</script>

<style scoped>
/* Boomer styles */
.boomer {
  text-align: center;
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

/* Millennial styles */
.millennial {
  text-align: center;
}
.welcomeDiv {
  background-color: #6775b6;
  color: white;
}
.showcaseDiv h2 {
  margin-top: 50px;
}
.millennialImages {
  width: 100%;
  background-color: #6775b6;
  color: white;
}
.millennialImage {
  width: 45%;
  display: inline-block;
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
</style>
