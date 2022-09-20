<template>
  <button @click="onClickShow">
    show
  </button>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance} from "vue";
import {useModal} from "@/plugins/programmatic-modal";
import TestModal from "@/components/modals/TestModal.vue"

export default defineComponent({
  setup(props, ctx) {
    const router = getCurrentInstance()!.proxy.$router!

    const modal = useModal(TestModal, {
      title: 'this is programmatic!!'
    }, {
      close(e) {
        console.log('close')
        e.preventDefault()
      },
    })

    const onClickShow = () => {
      modal.show()
      setTimeout(() => {
        router.push('/').then(() => console.log(modal.vueInstance))

      }, 1000)
    }

    return {
      onClickShow,
    }
  }
})
</script>