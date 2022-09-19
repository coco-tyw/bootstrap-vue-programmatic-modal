<template>
  <b-modal :title="title" visible>
  </b-modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>

</style>