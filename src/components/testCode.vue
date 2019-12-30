<template>
  <div class="game">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>Let's Play!</h2>
    </div>
    <div class="gameImages">
      <h2 class="millennialFont">Millennial</h2>
      <div class="gameImage">
        <img src="@/assets/millennial.png" alt="millennial" />
      </div>
      <div class="gameDiv">
        <div class="score">Score: {{ score }}</div>
        <ul>
          <li>{{ currentQuestionText }}</li>
          <li
            v-for="(answer, index) in questionBank"
            class="answerButton"
            :key="index"
            @click="increaseScore(answer)"
          >
            {{ answer }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Navigation from './Navigation.vue'

export default {
  data () {
    return {
      wholeResponses: [],
      results: [],
      questionBank: [],
      score: 0,
      newScore: localStorage.getItem('score'),
      correct_answer: null,
      question: {},
      currentQuestionText: ''
    }
  },
  async mounted () {
    await this.getQuestion()
  },
  methods: {
    async getQuestion () {
      this.questionBank = []

      try {
        const res = await axios.get(
          'https://opentdb.com/api.php?amount=1&type=multiple'
        )
        this.question = { ...res.data.results[0] }
        this.currentQuestionText = this.question.question
        this.correct_answer = this.question.correct_answer
        this.questionBank = [
          ...this.questionBank,
          this.question.correct_answer,
          ...this.question.incorrect_answers
        ]
      } catch (err) {
        console.error(err)
      }
    },
    async increaseScore (answer) {
      if (answer === this.correct_answer) {
        console.log('Correct', answer)
        this.score += 1
        await this.getQuestion()
      } else {
        console.log('Sorry guess again')
      }
    }
  },
  components: {
    'app-navigation': Navigation
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
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  padding-bottom: 50px;
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
.score {
  font-size: 32px;
}
</style>