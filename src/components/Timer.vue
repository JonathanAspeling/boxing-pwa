<script setup>
import { useTimerStore } from '../stores/timerstore'
import { watch, ref } from 'vue'

const timerStore = useTimerStore()
const intervalId = ref(null)

// Function to format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

watch(
  () => timerStore.isRunning,
  (newVal) => {
    if (newVal) {
      if (intervalId.value === null) {
        intervalId.value = setInterval(() => {
          if (timerStore.roundTime > 0) {
            timerStore.roundTime -= 1;
          }
        }, 1000);
      }
    } else {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    }
  }
)
</script>

<template>
  <div class="m-auto flex justify-center text-8xl">
    {{ formatTime(timerStore.roundTime) }}
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
