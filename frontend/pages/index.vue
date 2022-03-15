<template>
  <div class="place-body">
    <bot-text-dialog
      question="Hi there!!! In order to place you into a house, you'll need to answer some questions. How should I call you?"
    />

    <user-text-input v-if="!nameIsGiven" />

    <template v-if="nameIsGiven">
      <user-selected-answer :answer="username" />
      <bot-text-dialog
        :question="`Nice to meet you ${this.username}! Now I'll ask you some questions...`"
      />
      <div v-for="(response, index) in responses" :key="index">
        <bot-text-dialog :question="response.question" :animation="false" />
        <user-selected-answer :answer="response.answer" />
      </div>
      <template v-if="actualData !== 'finished'">
        <bot-text-dialog
          :question="actualData.title"
          :key="actualQuestionKey"
          idOfQuestion="bot-actual-question"
        />
        <user-options-wrapper
          :actualSurveyData="actualData"
          :key="actualQuestionKey"
        />
      </template>
    </template>
  </div>
</template>

<script>
import surveyData from './data/sorting_hat.json'
import eventBus from '../utils/eventBus'
definePageMeta({
  layout: "topbar",
})
/**
 * In the index page the bot talks to the user and asks the questions related to which one of the houses is the one for the user.
 */
export default {
  data() {
    return {
      username: null,
      responses: [],
      userResults: {
        "g": 0,
        "r": 0,
        "h": 0,
        "s": 0
      },
      hogwartsHouses: {
        g: { logo: 'gryffindor_logo', name: 'Gryffindor' },
        s: { logo: 'slytherin_logo', name: 'Slytherin' },
        r: { logo: 'ravenclaw_logo', name: 'Ravenclaw' },
        h: { logo: 'hufflepuff_logo', name: 'Hufflepuff' }
      },
      actualSurveyDataIndex: 0,
      actualQuestionKey: 0,
    }
  },

  computed: {
    actualData() {
      return (this.actualSurveyDataIndex < 28) ? surveyData[this.actualSurveyDataIndex] : 'finished'
    },

    nameIsGiven() {
      return this.username !== null
    }
  },

  methods: {
    getWinnerHouseLetter() {
      const winnerLetter = Object.keys(this.userResults).reduce((a, b) => this.userResults[a] > this.userResults[b] ? a : b)
      return winnerLetter
    }
  },

  mounted() {
    eventBus().emitter.on('set-username', newName => {
      this.username = newName
    })

    eventBus().emitter.on('sum-user-scores', userResponse => {
      this.userResults["g"] += userResponse.scores["g"]
      this.userResults["r"] += userResponse.scores["r"]
      this.userResults["h"] += userResponse.scores["h"]
      this.userResults["s"] += userResponse.scores["s"]

      this.responses.push({
        question: userResponse.question,
        answer: userResponse.answer
      })

      this.actualQuestionKey++
      this.actualSurveyDataIndex++
      if (this.actualSurveyDataIndex === surveyData.length) {
        const winnerHouseLetter = this.getWinnerHouseLetter()
        this.$router.push({
          name: 'results', params: {
            username: this.username,
            winnerHouseName: this.hogwartsHouses[winnerHouseLetter].name,
            winnerHouseLogo: this.hogwartsHouses[winnerHouseLetter].logo
          }
        })
      }
    })
  }

}
</script>