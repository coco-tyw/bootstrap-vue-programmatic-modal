import Vue, {CreateElement, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, VNodeData} from 'vue'
import {BModal, BvModalEvent} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('BModal', BModal)

export type GetProps<T> = T extends new () => {
  $props: infer Props;
} ? Props : never

type ModalListeners = Partial<{
  cancel: (e: BvModalEvent) => void
  change: (isVisible: boolean) => void
  close: (e: BvModalEvent) => void
  hidden: (e: BvModalEvent) => void
  hide: (e: BvModalEvent) => void
  ok: (e: BvModalEvent) => void
  show: (e: BvModalEvent) => void
  shown: (e: BvModalEvent) => void
}>


export const useModal = <T>(
  ModalComponent: T,
  props: GetProps<T>,
  modalListeners?: ModalListeners
) => {
  const parentInstance = getCurrentInstance()
  if (!parentInstance) {
    throw new Error
  }

  onBeforeUnmount(() => {
    modalWrapper.$destroy()
  })

  const parent = parentInstance.proxy
  const el = document.createElement('div')
  const modalId = String(Math.floor(Math.random() * 10000000000000000))

  const listeners = modalListeners || {}

  const ModalWrapper = Vue.extend({
    render(createElement: CreateElement) {
      return createElement(ModalComponent, {
        props,
        attrs: {
          id: modalId
        }
      } as VNodeData)
    },
    setup() {
      const instance = getCurrentInstance()!

      onMounted(() => {
        const modal = instance.proxy.$children[0].$children[0]
        for (const [key, listener] of Object.entries(listeners)) {
          if (listener) modal.$on(key, listener)
        }
      })

      onBeforeUnmount(() => {
        const modal = instance.proxy.$children[0].$children[0]
        for (const [key, listener] of Object.entries(listeners)) {
          if (listener) modal.$off(key, listener)
        }
      })
    }
  })

  const modalWrapper = new (Vue.extend(ModalWrapper))({parent, el})
  const modal = modalWrapper.$children[0].$children[0]

  return {
    id: modalId,
    vueInstance: modal,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    show: modal.show,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hide: modal.hide
  }
}