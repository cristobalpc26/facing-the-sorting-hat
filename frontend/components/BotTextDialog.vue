<template>
  <div class="bot-question">
    {{ question }}
  </div>
</template>

<script>
export default {
  name: 'bot-text-dialog',
  props: {
    question: {
      type: String,
      required: true
    }
  }
}
</script>