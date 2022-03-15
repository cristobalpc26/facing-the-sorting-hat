<template>
  <div :class="`bot-question ${animationClass}`" :id="idOfQuestion">
    {{ question }}
  </div>
</template>

<script>
/**
 * Bot text/question wrapper
 */
export default {
  name: 'bot-text-dialog',
  props: {
    question: {
      type: String,
      required: true
    },
    animation: {
      type: Boolean,
      default: true
    },
    idOfQuestion: {
      type: String,
      default: 'none'
    }
  },

  computed: {
    animationClass() {
      return this.animation ? 'animate-bot-question' : ''
    }
  },

  mounted() {
    if (this.idOfQuestion !== 'none') document.getElementById(this.idOfQuestion).scrollIntoView({ behavior: 'smooth' })
  }

}
</script>