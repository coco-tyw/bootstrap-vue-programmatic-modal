import Vue, {CreateElement, defineComponent, getCurrentInstance, h, onBeforeUnmount, onMounted, VNodeData} from 'vue'
import {BModal, BvModalEvent} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('BModal', BModal)

type GetProps<T> = T extends new () => {
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
  const instance = getCurrentInstance()
  if (!instance) {
    return
  }

  const parent = instance.proxy
  const el = document.createElement('div')

  const ModalWrapper = defineComponent({
    render(createElement: CreateElement) {
      return createElement(ModalComponent, {
        props,
      } as VNodeData)
    },
    setup(props, ctx) {
      const listeners = modalListeners || {}
      const instance = getCurrentInstance()!

      onMounted(() => {
        const modal = instance.proxy.$children[0].$children[0]
        for (const [key, listener] of Object.entries(listeners)) {
          if (listener) modal.$on(key, listener)
        }

        modal.$on('hidden', () => {
          for (const [key, listener] of Object.entries(listeners)) {
            if (listener) modal.$off(key, listener)
          }
          instance.proxy.$destroy()
        })
      })
    }
  })

  return new (Vue.extend(ModalWrapper))({parent, el})
}