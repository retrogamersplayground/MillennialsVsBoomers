<template>
  <div class="welcomeDiv" :class="getPlayerType">
    <ul>
      <li>
        <h1>
          <span class="millennialFont">Millennials</span> vs.
          <span class="boomerFont">BOOMERS</span>
        </h1>
      </li>
      <li class="home-link">
        <router-link to="/" class="homeButton">
          <h2>HOME</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    getPlayerType() {
      if (this.$route.name === 'Player' || this.$route.name === 'Game') {
        return `${this.$route.params.teamName.toLowerCase()}-bg`
      }
    }
  }
}
</script>

<style scoped>
.welcomeDiv {
  background-color: #388e3c;
  color: white;
  text-align: center;
  line-height: 1.6;
}
.welcomeDiv ul {
  position: relative;
}
.welcomeDiv ul li {
  display: inline-block;
}
.homeButton h2:hover {
  background-color: #fff;
  color: #388e3c;
}
.home-link {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.home-link a,
.home-link a h2 {
  height: 100%;
}
.boomer-bg {
  background-color: #e38120;
}
.millennial-bg {
  background-color: #6775b6;
}
</style>
