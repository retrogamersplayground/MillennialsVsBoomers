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
      playerTwoSet: false
    }
  },
  async mounted () {
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
      console.log(this.playerOneSet)
      console.log(this.playerTwoSet)
    }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>