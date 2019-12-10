
<template>
  <div class="game">
    <div class="welcomeDiv">
      <h1>
        <span class="millennialFont">Millennials</span> vs.
        <span class="boomerFont">BOOMERS</span>
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
          <li v-for="question in questionBank" class="questionsLi" v-bind:value="question" v-bind:key="question">{{ question[0] }}
            <ul>
              <li><button class="answerButton">{{ question[1] }}</button></li>
              <li><button class="answerButton">{{ question[2][0] }}</button></li>
              <li><button class="answerButton">{{ question[2][1] }}</button></li>
              <li><button class="answerButton">{{ question[2][2] }}</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      wholeResponses: [],
      results: [],
      questionBank: []
    }
  },
  mounted () {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(response => {
        this.wholeResponses = response.data
        this.results = this.wholeResponses.results
        for (const result of this.results) {
          this.questionBank.push([result.question, result.correct_answer, result.incorrect_answers])
          console.log(this.questionBank[0][1])
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
  }
}
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
.gameDiv ul {
    list-style-type: none;
    width: 100%;
    margin: auto;
    padding-top: 50px;
}
.questionsLi {
    text-align: left;
    font-size: 24px;
    margin-bottom: 100px;
}
.questionsLi ul li {
  display: inline-block;
}
.answerButton {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding: 20px 50px 20px;
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
</style>
