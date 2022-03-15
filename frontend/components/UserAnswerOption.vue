<template>
  <div class="user-answer-option">
    {{ answerOption }}
  </div>
</template>

<script>
/**
 * Component that wraps one answer option for the user
 */
export default {
  name: 'user-answer-option',
  props: {
    /**
     * The option to display
     */
    answerOption: {
      type: String,
      required: true
    }
  },
}
</script>