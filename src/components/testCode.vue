
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
        score: 0,
        status: null
      },
      playerTwo: {
        type: null,
        id: null,
        time: null,
        score: 0,
        status: null
      },
      playerOneSet: false,
      playerTwoSet: false,
      playerOneStatus: null,
      playerTwoStatus: null,
      playerOneOpponent: [],
      playerTwoOpponent: [],
      game: false,
      interval: null,
      interval2: null,
      interval3: null,
      playerOneOpponentScore: null,
      playerTwoOpponentScore: null
    }
  },
  async mounted () {
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
    /*this.interval2 = setInterval(() => {
      if (this.gameOver && this.playerOneOpponetScore === null) {
        db.collection('game')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc  => {
            this.playerOneOpponentScore = doc.data().playerTwoScore
          }) 
        })
        console.log('boomer still playing')
      } else if (this.gameOver && this.playerOneOpponetScore !==null) {
          clearInterval(this.interval2)
          console.log(this.playerTwoOpponetScore + ' boomer score')
      }
    }, 5000)
    this.interval3 = setInterval(() => {
      if (this.gameOver && this.playerTwoOpponetScore === null) {
        db.collection('game')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc  => {
            this.playerTwoOpponentScore = doc.data().playerOneScore
          }) 
        })
        console.log('millennial still playing')
      } else if (this.gameOver && this.playerTwoOpponetScore !==null) {
          clearInterval(this.interval3)
          console.log(this.playerTwoOpponetScore + ' millennial score')
      }
    }, 5000)
  */
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
        this.gameOver = true
        console.log(this.gameOver + ' this.gameOver test')
        if (this.user && this.player.type === 'millennial')  {
          this.playerOne.score = this.score
          console.log(this.playerOne.score)
          db.collection('game')
          .add({
            playerOneId: this.playerOne.id,
            playerOneScore: this.playerOne.score,
            playerOneStatus: 'gameOver'
          })
          this.playerOne.status = 'gameOver'
        }
        if (this.user && this.player.type === 'boomer')  {
          this.playerTwo.score = this.score
          console.log(this.playerTwo.score)
          db.collection('game')
          .add({
            playerTwoId: this.playerTwo.id,
            playerTwoScore: this.playerTwo.score,
            playerTwoStatus: 'gameOver'
          })
          this.playerTwo.status = 'gameOver'
        }
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
    }
  },
  components: {
    'app-navigation': Navigation
  }
}
</script>
