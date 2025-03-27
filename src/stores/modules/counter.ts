import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const age = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
      age.value++
    }

    return { count, age, doubleCount, increment }
  },
  // { persist: true }
  // { persist: { key: 'my-cuunter-key', storage: localStorage } }
  // { persist: { key: 'my-cuunter-key', storage: sessionStorage } }
  { persist: { key: 'my-cuunter-key', storage: sessionStorage, pick: ['count'] } }
)
