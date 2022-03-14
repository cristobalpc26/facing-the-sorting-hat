<template>
  <div class="user-answer-option">
    {{ answerOption }}
  </div>
</template>

<script>
export default {
  name: 'user-answer-option',
  props: {
    answerOption: {
      type: String,
      required: true
    }
  },
}
</script>