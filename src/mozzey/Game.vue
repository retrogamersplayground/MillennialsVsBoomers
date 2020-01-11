// THIS IS NOT BEING USED. GONNA WORK ON IT TOMORROW
<template>
  <div class="game">
    <div class="showcaseDiv">
      <h2>Let's Play!</h2>
    </div>
    <div class="gameDiv">
      <div class="gameCount">Question: {{ gameCount }}</div>
      <div class="score">Score: {{ score }}</div>
      <ul>
        <template v-if="!game && !gameOver">
          <li><p>Waiting for the other player...</p></li>
        </template>
        <template v-else-if="game && !gameOver">
          <li v-html="currentQuestionText">{{ currentQuestionText }}</li>
          <li
            v-html="answer"
            v-for="(answer, index) in questionBank"
            class="answerButton"
            :key="index"
            @click="increaseScore(answer)"
          >
            {{ answer }}
          </li>
        </template>
        <template v-else-if="gameOver">
          <img src="@/assets/temgtriggered.gif" alt="triggered Canadian" />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import db from '../components/firebaseInit'

export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  text-align: center;
}
.welcomeDiv {
  background-color: #6775b6;
  color: white;
}
.showcaseDiv h2 {
  margin-top: 50px;
}
.gameImages {
  width: 100%;
  background-color: #6775b6;
  color: white;
}
.gameImage {
  width: 45%;
  display: inline-block;
}
.boomerImage img {
  width: 70%;
}
.gameDiv ul {
  list-style-type: none;
  padding-top: 50px;
}
.answerButton {
  margin: auto;
  width: 50%;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #ffffff;
  color: #6775b6;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
.answerButton:hover {
  background-color: #6775b6;
  color: #ffffff;
}
.score {
  font-size: 32px;
}
</style>
