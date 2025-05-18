import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timerstore', () => {
  const roundTime = ref(180)
  const breakTime = ref(0)
  const isRunning = ref(false)

  function setRoundTime(seconds: number) {
    roundTime.value = seconds
  }

  function setBreakTime(seconds: number) {
    breakTime.value = seconds
  }

  function toggleTimer() {
    isRunning.value = !isRunning.value
  }

  return {
    roundTime,
    breakTime,
    isRunning,
    setRoundTime,
    setBreakTime,
    toggleTimer,
  }
})
