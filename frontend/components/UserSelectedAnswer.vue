<template>
  <div class="user-answer-wrapper">
    <div class="user-selected-answer">
      {{ answer }}
    </div>
  </div>
</template>

<script>
/**
 * Selected answer by the user that is static displayed
 */
export default {
  name: 'user-selected-answer',
  props: {
    /**
     * Answer by the user
     */
    answer: {
      type: String,
      required: true
    }
  }
}
</script>