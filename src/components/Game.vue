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
        <div class="score">Score: {{ newScore }}</div>
        <ul>
          <li v-for="question in questionBank" class="questionsLi" v-bind:value="question" v-bind:key="question">{{ question[0] }}
            <ul>
              <li><button class="answerButton" id="button1" v-on:click="increaseScore()">{{ question[1] }}</button></li>
              <li><button class="answerButton" id="button2" v-on:click="increaseScore2()">{{ question[2][0] }}</button></li>
              <li><button class="answerButton" id="button3" v-on:click="increaseScore3()">{{ question[2][1] }}</button></li>
              <li><button class="answerButton" id="button4" v-on:click="increaseScore4()">{{ question[2][2] }}</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
export default {
  data () {
    return {
      wholeResponses: [],
      results: [],
      questionBank: [],
      score: 0,
      newScore: localStorage.getItem('score'),
      correct_answer: []
    }
  },
  mounted () {
    axios
      .get('https://opentdb.com/api.php?amount=1&type=multiple')
      .then(response => {
        this.wholeResponses = response.data
        this.results = this.wholeResponses.results
        for (const result of this.results) {
          this.questionBank.push([result.question, result.correct_answer, result.incorrect_answers])
          this.correct_answer.push([result.correct_answer])
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    increaseScore () {
      let button1 = document.getElementById('button1').innerHTML
      console.log(button1)
      console.log('****' + this.correct_answer[0][0])
      if (button1 === this.correct_answer[0][0]) {
        this.score = this.score + 1
        this.score = localStorage.setItem('score', this.score)
        alert('Correct Answer!')
        location.reload()
      } else {
        alert('Nope! Sorry Snowflake!')
        location.reload()
      }
      this.score = this.newScore
    },
    increaseScore2 () {
      let button2 = document.getElementById('button2').innerHTML
      console.log(button2)
      console.log('****' + this.correct_answer[0][0])
      if (button2 === this.correct_answer) {
        this.score = this.score + 1
        alert('Correct Answer!')
        location.reload()
      } else {
        alert('Nope! Sorry Snowflake!')
        location.reload()
      }
    },
    increaseScore3 () {
      let button3 = document.getElementById('button3').innerHTML
      console.log(button3)
      console.log('****' + this.correct_answer[0][0])
      if (button3 === this.correct_answer) {
        this.score = this.score + 1
        alert('Correct Answer!')
        location.reload()
      } else {
        alert('Nope! Sorry Snowflake!')
        location.reload()
      }
    },
    increaseScore4 () {
      let button4 = document.getElementById('button4').innerHTML
      console.log(button4)
      console.log('****' + this.correct_answer[0][0])
      if (button4 === this.correct_answer) {
        this.score = this.score + 1
        alert('Correct Answer!')
        location.reload()
      } else {
        alert('Nope! Sorry Snowflake!')
        location.reload()
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
.score {
  font-size: 32px;
}
</style>
