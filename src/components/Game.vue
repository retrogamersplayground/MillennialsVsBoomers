<template>
  <div class="game">
    <app-navigation></app-navigation>
    <div class="showcaseDiv">
      <h2 v-if="!gameOver">Let's Play!</h2>
      <h2 v-if="gameOver">Game Over</h2>
    </div>
      <div class="gameDiv">
        <div class="score">Score: {{ score }}</div>
        <ul>
          <template v-if="!game && !gameOver">
            <li><p>Waiting for the other player...</p></li>
          </template>
          <template v-else-if="game && !gameOver">
            <div class="gameCount">Question: {{ gameCount }}</div>
            <li class="questionLi" v-html="currentQuestionText">{{ currentQuestionText }}</li>
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
          <template v-else-if="user && gameOver && playerOneStatus === 'winner'">
            <h2>You Won!!!!!!</h2>
            <img src="@/assets/temgtriggered.gif" alt="triggered Canadian" />
          </template>
          <template v-else-if="user && gameOver && playerTwoStatus === 'winner'">
            <h2>You Won!!!!!!</h2>
            <img src="@/assets/temgtriggered.gif" alt="triggered Canadian" />
          </template>
          <!--<template v-else-if="user && gameOver && playerOneStatus !== 'winner'">
            <h2>You lost :(</h2>
            <video autoplay loop>
              <source src="@/assets/winner2.mp4" alt="Elon dancing" type="video/mp4">
            </video>
          </template>-->
          <template v-else-if="user && gameOver && playerTwoStatus !== 'winner'">
            <h2>You lost :(</h2>
            <img src="@/assets/temgtriggered.gif" alt="triggered Canadian" />
          </template>
        </ul>
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
      lobbyId: null,
      playerArray: [],
      type: '',
      id: '',
      time: '',
      player: {},
      playerOne: {
        type: null,
        id: null,
        time: null,
        score: 0
      },
      playerTwo: {
        type: null,
        id: null,
        time: null,
        score: 0
      },
      playerOneSet: false,
      playerTwoSet: false,
      playerOneStatus: null,
      playerTwoStatus: null,
      playerOneOpponent: [],
      playerTwoOpponent: [],
      game: false,
      interval: null
    }
  },
  async mounted () {
    console.log(this.game)
    if(this.playerOneSet) {
      db.collection('lobby')
      .add({
        playerOneId:
        this.playerOne.id,
        playerOneStatus: 'waiting'
      })
      this.playerOneStatus = 'waiting'
    }
    if(this.playerTwoSet) {
      db.collection('lobby')
      .add({
        playerTwoId:
        this.playerTwo.id,
        playerTwoStatus: 'waiting'
      })
      this.playerTwoStatus = 'waiting'
    }
    if (this.playerOneStatus === 'waiting') {
      db.collection('lobby')
      .where('playerTwoStatus', '==', 'waiting')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.playerOneOpponent = doc.data().playerTwoId
          this.playerOneStatus = 'inGame'
          this.game = true
        })
      })
      this.interval = setInterval(() => {
        if(this.playerOneStatus === 'waiting' || this.playerTwoStatus === 'waiting') {
          window.location.reload(true)
        }
        else if(this.playerOneStatus === 'inGame' || this.playerTwoStatus === 'inGame') {
          clearInterval(this.interval)
        }
      }, 5000)
    }
    if (this.playerTwoStatus === 'waiting') {
      db.collection('lobby')
      .where('playerOneStatus', '==', 'waiting')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.playerTwoOpponent = doc.data().playerOneId
          this.playerTwoStatus = 'inGame'
          this.game = true
        })
      })
    }
    if (this.gameOver && (this.playerOne.score > this.playerTwo.score)) {
      this.playerOneStatus = 'winner'
    } else if (this.gameOver && (this.playerTwo.score > this.playerOne.score)) {
      this.playerTwoStatus = 'winner'
    }
    if (this.gameOver) {
      this.playerOneSet = false
      this.playerTwoSet = false
      this.game = false
      console.log(this.playerOneStatus)
      console.log(this.playerTwoStatus)
    }
    await this.getQuestion()
  },
  methods: {
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
        this.playerOne.score = this.score
        this.playerTwo.score = this.score
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
        this.playerOne.id = 'playerOne' + '_' + this.lobbyId
        this.playerOne.time = this.player.time
        this.playerOneSet = true
      } else if (this.player.type === 'boomer') {
        this.playerTwo.type = this.player.type
        this.playerTwo.id = 'playerTwo' + '_' + this.lobbyId
        this.playerTwo.time = this.player.time
        this.playerTwoSet = true
      }
      console.log(this.playerOneSet)
      console.log(this.playerTwoSet)
    }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>

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
  font-size: 38px;
  margin-bottom: 10px;
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
.gameCount {
  margin-bottom: 20px;
  font-size: 24px;
}
.questionLi {
  font-size: 20px;
}
.answerButton {
  margin: auto;
  width: 50%;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #6775b6;
  color: #ffffff;
  font-size: 24px;
  border: 2px solid #ffffff;
  border-radius: 6px;
}
.answerButton:hover {
    background-color: #ffffff;
    color: #6775b6;
    border: 2px solid #677fb6;
}
.score {
  font-size: 32px;
}
</style>
