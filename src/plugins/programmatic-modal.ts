import Vue, {Component, getCurrentInstance, h} from 'vue'
import { BModal } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {ComponentOptions, FunctionalComponentOptions} from "vue/types/options";
import {DefineComponent} from "vue/types/v3-define-component";

Vue.component('BModal', BModal)


export const useModal = <T extends typeof Vue | DefineComponent>(ModalComponent: T) => {
  const instance = getCurrentInstance()
  if (!instance) {
    return
  }

  const ExtendedModalContent = Vue.extend({
    extends: ModalComponent,
    mounted() {
      console.log(this.$el)
      this.$el.addEventListener('hidden', () => console.log())
    }
  })

  const Modal = Vue.extend()
  const modal = new Modal({
    parent: instance.proxy.$root,
    el: document.createElement('div'),
    render() {
      return h(ExtendedModalContent, {
        props: {
          title: 'this is programmatic!!'
        },
      })
    }
  })
  return modal
}