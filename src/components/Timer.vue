<script setup>
import { useTimerStore } from '../stores/timerstore';
import { watch, ref } from 'vue';

const timerStore = useTimerStore();
const intervalId = ref(null);

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
          if (timerStore.timerMode === 'round') {
            if (timerStore.currentRoundTimeRemaining > 0) {
              timerStore.currentRoundTimeRemaining -= 1;
            }
            if (timerStore.currentRoundTimeRemaining === 0) {
              timerStore.timerMode = 'rest';
              timerStore.roundCount += 1;
              timerStore.currentBreakTimeRemaining = timerStore.breakTime;
            }
          } else if (timerStore.timerMode === 'rest') {
            if (timerStore.currentBreakTimeRemaining > 0) {
              timerStore.currentBreakTimeRemaining -= 1;
            }
            if (timerStore.currentBreakTimeRemaining === 0) {
              timerStore.timerMode = 'round';
              timerStore.currentRoundTimeRemaining = timerStore.roundTime;
            }
          }
        }, 1000);
      }
    } else {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    }
  },
);
</script>

<template>
  <div class="m-auto flex flex-col items-center justify-center text-8xl">
    <div>
      {{
        timerStore.timerMode === 'round'
          ? formatTime(timerStore.currentRoundTimeRemaining)
          : formatTime(timerStore.currentBreakTimeRemaining)
      }}
    </div>
    <div class="mt-4 text-2xl">
      <span class="ml-4">Rounds: {{ timerStore.roundCount }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
