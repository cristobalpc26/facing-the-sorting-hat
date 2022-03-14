<template>
  <div class="user-text-input-wrapper">
    <form @submit.prevent="sendInputText()" class="user-name-form">
      <input
        type="text"
        class="user-name-input"
        name="user-name-input"
        v-model="inputText"
        required
      />
      <button type="submit" class="name-submit-button">
        <img
          class="name-submit-button-icon"
          src="/assets/icons/bxs-chevron-right.svg"
          alt="submit-icon"
        />
      </button>
    </form>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
  name: 'user-text-input',

  data() {
    return {
      inputText: ''
    }
  },

  methods: {
    sendInputText() {
      eventBus().emitter.emit('set-username', this.inputText)
    }
  }
}
</script>