<script setup>
import { ref, onMounted } from 'vue';

// Reactive variable for round time in seconds
const roundTime = ref(180); // Example: 3 minutes (180 seconds)
const breakTime = ref(30); // Example: 0.5 minute (30 seconds)

// Function to format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Countdown function
const startCountdown = () => {
  const interval = setInterval(() => {
    if (roundTime.value > 0) {
      roundTime.value -= 1;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};


onMounted(() => {

});
</script>

<template>
  <div class="m-auto flex justify-center text-8xl">
    {{ formatTime(roundTime) }}
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
