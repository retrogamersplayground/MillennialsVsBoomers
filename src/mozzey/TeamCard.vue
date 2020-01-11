<template>
  <div class="homeImage">
    <form @submit.prevent="pickTeam(team)">
      <input disabled type="hidden" v-model="teamId" id="teamId" required />
      <button type="submit">
        <div>
          <img :src="getImg" :alt="team" />
          <h2 :class="fontClass">{{ team }}</h2>
        </div>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',
  props: ['team', 'teamId', 'pickTeam'],
  data() {
    // console.log(this.team.toLowerCase().replace("s", ""));
    return {
      imageSrc: `../assets/${this.team.toLowerCase().replace('s', '')}.png`,
      fontClass: `${this.team.toLowerCase().replace('s', '')}Font`
    }
  },
  computed: {
    getImg() {
      return require(`@/assets/${this.team.toLowerCase().replace('s', '')}.png`)
    }
  }
}
</script>

<style>
.homeImage {
  width: 45%;
  display: inline-block;
}
.homeImage img {
  width: 80%;
}

button {
  background-color: #388e3c;
  border: none;
}
</style>
