<template>
  <div class="place-body">
    <h2 id="greetings-results-title">
      Congratulations {{ $route.params.username }}!!! You've been selected for
      <b>{{ $route.params.winnerHouseName }}</b>
    </h2>
    <div id="results-image-wrapper">
      <img
        id="results-house-img"
        :src="`/assets/images/${$route.params.winnerHouseLogo}.png`"
        alt="house_logo"
      />
    </div>
  </div>
</template>
<script>
definePageMeta({
  layout: "topbar",
})

/**
 * Results page show the score of the user and displays the house that won. It also displays the percentages of the other houses.
 */

export default {
  beforeMount() {
    if (this.$route.params.username === undefined) {
      this.$router.push('/')
    }
  }
}
</script>