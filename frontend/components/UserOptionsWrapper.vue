<template>
  <div class="user-answer-options">
    <ul class="user-answer-options-wrapper">
      <li
        class="user-answer-option-li"
        v-for="(answer, index) in actualSurveyData.answers"
        :key="index"
      >
        <user-answer-option
          :answerOption="answer.title"
          @click="sendUserResponse(answer)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
  name: 'user-options-wrapper',
  props: {
    actualSurveyData: {
      type: Object,
      required: true,
      default: () => {
        return [
          {
            "title": "Dawn",
            "scores": {
              "g": 100,
              "r": 100,
              "h": 0,
              "s": 0
            }
          },
          {
            "title": "Dusk",
            "scores": {
              "g": 0,
              "r": 0,
              "h": 100,
              "s": 100
            }
          }
        ]
      }
    }
  },

  methods: {
    sendUserResponse(answer) {
      eventBus().emitter.emit('sum-user-scores', {
        question: this.actualSurveyData.title,
        answer: answer.title,
        scores: answer.scores
      })
    }
  }
}
</script>