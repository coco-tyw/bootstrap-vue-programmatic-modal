<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="onClickShow">
        show
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useModal} from "@/plugins/programmatic-modal";
import TestModal from "@/components/modals/TestModal.vue"

export default defineComponent({
  setup(props, ctx) {
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
      setTimeout(modal.hide, 1000)
    }

    return {
      onClickShow,
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
