import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timerstore', () => {
  const roundTime = ref(0)
  const breakTime = ref(0)

  function setRoundTime(seconds: number) {
    roundTime.value = seconds
  }

  function setBreakTime(seconds: number) {
    breakTime.value = seconds
  }

  return {
    roundTime,
    breakTime,
    setRoundTime,
    setBreakTime,
  }
})
