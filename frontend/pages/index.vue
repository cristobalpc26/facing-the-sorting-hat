<template>
  <div class="body-position">
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
        <bot-text-dialog :question="response.question" />
        <user-selected-answer :answer="response.answer" />
      </div>
      <bot-text-dialog :question="actualData.title" :key="actualQuestionKey" />
      <user-options-wrapper
        @change="window.scrollTo(0, document.body.scrollHeight)"
        :actualSurveyData="actualData"
        :key="actualQuestionKey"
      />
      <div id="aaa"></div>
    </template>
  </div>
</template>

<script>
import surveyData from './data/sorting_hat.json'
import eventBus from '../utils/eventBus'
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
      actualSurveyDataIndex: 0,
      actualQuestionKey: 0,
    }
  },

  computed: {
    actualData() {
      return surveyData[this.actualSurveyDataIndex]
    },

    nameIsGiven() {
      return this.username !== null
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
      console.log(this.userResults)
      document.getElementById("aaa").scrollIntoView({ behavior: "smooth" })
    })
  }

}
</script>

<script setup>
definePageMeta({
  layout: "topbar",
});
</script>