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

/**
 * Wrapper for the possible answers 
 */
export default {
  name: 'user-options-wrapper',
  props: {
    /**
     * Actual question/answer pair
     */
    actualSurveyData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    sendUserResponse(answer) {
      eventBus().emitter.emit('sum-user-scores', {
        question: this.actualSurveyData.title,
        answer: answer.title,
        scores: answer.scores
      })
    }
  },

}
</script>