<script setup>
import { useTimerStore } from '../stores/timerstore'
import { onMounted } from 'vue'

const timerStore = useTimerStore()

// Function to format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Countdown function
const startCountdown = () => {
  const interval = setInterval(() => {
    if (timerStore.roundTime > 0) {
      timerStore.roundTime -= 1;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<template>
  <div class="m-auto flex justify-center text-8xl">
    {{ formatTime(timerStore.roundTime) }}
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
