<template>
  <div class="game">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2>Let's Play!</h2>
    </div>
      <div class="gameDiv">
        <div class="gameCount">Question: {{ gameCount }}</div>
        <div class="score">Score: {{ score }}</div>
        <ul v-if="playerOne === true && playerTwo === true && !gameOver">
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
        </ul>
        <ul v-if="!game && !gameOver">
          <li><p>Waiting for the other player...</p></li>
        </ul>
        <ul v-if="gameOver">
          <img src="@/assets/temgtriggered.gif" alt="triggered Canadian">
          <!--<video src="@/assets/triggered1.mp4" autoplay loop></video>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Navigation from './Navigation.vue'
import firebase from 'firebase'
import db from './firebaseInit'

export default {
  data () {
    return {
      questionBank: null,
      score: 0,
      correct_answer: null,
      question: {},
      currentQuestionText: '',
      gameCount: 1,
      answerArray: [],
      shuffledAnswers: [],
      gameOver: false,      
      user: firebase.auth().currentUser,
      uid: null,
      teamId: null,
      teamId2: null,
      lobbyId: null,
      playerArray: [],
      type: '',
      id: '',
      time: '',
      player: {},
      playerOne: {
        type: null,
        id: null,
        time: null
      },
      playerTwo: {
        type: null,
        id: null,
        time: null
      },
      playerOneSet: false,
      playerTwoSet: false,
      playerOneId: null,
      playerTwoId: null,
      playerOneStatus: null,
      playerTwoStatus: null,
      game: false
    }
  },
  async mounted () {
    await this.getQuestion()
    await this.addData()
    await this.fetchData()
    await this.updateData()
  },
  watch: {
    $route: 'fetchData',
    $route: 'updateData'
  },
  methods: {
    async addData () {
      if (this.playerOneSet) {
        db.collection('status')
          .add({
            playerOneId: this.playerOne.type + this.playerOne.id,
            playerOneStatus: 'waiting'
          })
      } else if (this.playerTwoSet) {
        db.collection('status')
          .add({
            playerTwoId: this.playerTwo.type + this.playerTwo.id,
            playerTwoStatus: 'waiting'
          })
      }
    },
    async fetchData () {
      db.collection('status')
      .get()
      .then(querySnapshot => {
        this.playerOneId = doc.data().playerOneId
        this.playerTwoId = doc.data().playerTwoId
        this.playerOneStatus = doc.data().playerOneStatus
        this.playerTwoStatus = doc.data().playerTwoStatus
        })
    },
    async updateData () {
      while(this.playerTwoStatus === 'waiting') {
        db.collection('status')
        .where('playerOneStatus', '==', this.$route.params.playerOneStatus)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                playerOneStatus: 'inGame'
              }) 
              .add({
                gameId: this.playerOneId + this.playerTwoId
              })
          })      
        })
      }
      while(this.playerOneStatus === 'waiting') {
        db.collection('status')
        .where('playerTwoStatus', '==', this.$route.params.playerOneStatus)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                playerTwoStatus: 'inGame'
              }) 
              .add({
                gameId: this.playerOneId + this.playerTwoId
              })
          })      
        })
      }
      if (this.playerOne.status === 'inGame' || this.playerTwo.status === 'inGame') {
        this.game = true
      }
    },
    shuffle (array) {
      // eslint-disable-next-line
      var currentIndex = array.length, temporaryValue, randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    async getQuestion () {
      this.questionBank = []

      try {
        const res = await axios.get(
          'https://opentdb.com/api.php?amount=1&type=multiple'
        )
        this.question = { ...res.data.results[0] }
        this.currentQuestionText = this.question.question
        this.correct_answer = this.question.correct_answer
        this.answerArray = [
          this.question.correct_answer,
          this.question.incorrect_answers[0],
          this.question.incorrect_answers[1],
          this.question.incorrect_answers[2]
        ]
        this.shuffledAnswers = this.shuffle(this.answerArray)
        this.questionBank = [
          ...this.questionBank,
          ...this.shuffledAnswers
        ]
      } catch (err) {
        console.error(err)
      }
    },
    async increaseScore (answer) {
      if (this.gameCount < 10) {
        if (answer === this.correct_answer) {
          alert('Correct', answer)
          this.score += 1
        } else {
          alert('Nope! Sorry Snowflake!')
        }
        this.gameCount += 1
        await this.getQuestion()
      } else {
        alert('GameOver')
        this.gameOver = true
      }
    }
  },
  created () {
    if (this.user != null) {
      this.uid = this.user.uid
      this.lobbyId = this.$route.params.lobbyId
      this.playerArray.push(this.lobbyId.split('_'))
      this.type = this.playerArray[0][0]
      this.id = this.playerArray[0][1]
      this.time = this.playerArray[0][2]
      this.player = {
        type: this.type,
        id: this.id,
        time: this.time
      }
      if (this.player.type === 'millennial') {
        this.playerOne.type = this.player.type
        this.playerOne.id = this.player.id
        this.playerOne.time = this.player.time
        this.playerOneSet = true
      } else if (this.player.type === 'boomer') {
        this.playerTwo.type = this.player.type
        this.playerTwo.type = this.player.id
        this.playerTwo.time = this.player.time
        this.playerTwoSet = true
      }
    }
  },
  mounted () {
    
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
