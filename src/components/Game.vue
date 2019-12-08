
<template>
  <div class="game">
    <div class="welcomeDiv">
      <h1>
        <span class="millennialFont">Millennials</span> vs.
        <span class="boomerFont">Boomers</span>
      </h1>
    </div>
    <div class="showcaseDiv">
      <h2>Let's Play!</h2>
    </div>
    <div class="gameImages">
      <h2 class="millennialFont">Millennial</h2>
      <div class="gameImage">
        <img src="@/assets/millennial.png" alt="millennial" />
      </div>
      <div class="gameDiv">
        <ul>
          <li v-for="result in results" class="questionsLi">{{ result.question }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      wholeResponses: [],
      results: []
    }
  },
  mounted() {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(response => {
        this.wholeResponses = response.data
        console.log(this.wholeResponses.results[0].question)
        this.results = this.wholeResponses.results
      })
      .catch(error => {
        console.log(error)
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  text-align: center;
}
.welcomeDiv {
  background-color: #6775B6;
  color: white;
}
.showcaseDiv h2{
  margin-top: 50px;
}
.gameImages {
  width: 100%;
  background-color: #6775B6;
  color: white;
}
.gameImage {
  width: 45%;
  display: inline-block;
}
.boomerImage img {
  width: 70%;
}
</style>
