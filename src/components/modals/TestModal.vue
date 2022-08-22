<template>
  <b-modal :title="title" visible>

  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    }
  },
})
</script>

<style scoped>

</style>