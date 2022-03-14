<template>
  <div class="user-answer-wrapper">
    <div class="user-selected-answer">
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-selected-answer',
  props: {
    answer: {
      type: String,
      required: true
    }
  }
}
</script>