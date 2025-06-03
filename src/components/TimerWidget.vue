<script setup>
import { useTimerStore } from '../stores/timerstore';
import { watch, ref } from 'vue';

const timerStore = useTimerStore();
const intervalId = ref(null);
const audio = new Audio(
  import.meta.env.BASE_URL + '/assets/sounds/boxing-bell.mp3',
);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

watch(
  () => timerStore.isRunning,
  (newVal, oldVal) => {
    if (newVal) {
      // Play bell sound and increment round counter when timer starts for the first time (round 1)
      if (
        timerStore.timerMode === 'round' &&
        timerStore.roundCount === 0 &&
        timerStore.currentRoundTimeRemaining === timerStore.roundTime
      ) {
        audio.currentTime = 0;
        audio.play();
        timerStore.roundCount = 1;
      }
      if (intervalId.value === null) {
        intervalId.value = setInterval(() => {
          if (timerStore.timerMode === 'round') {
            if (timerStore.currentRoundTimeRemaining > 0) {
              timerStore.currentRoundTimeRemaining -= 1;
            }
            if (timerStore.currentRoundTimeRemaining === 0) {
              // If last round just finished, play bell and stop timer
              if (timerStore.roundCount >= timerStore.totalRounds) {
                audio.currentTime = 0;
                audio.play();
                timerStore.isRunning = false;
                clearInterval(intervalId.value);
                intervalId.value = null;
                return;
              }
              // Play sound when round ends (not last round)
              audio.currentTime = 0;
              audio.play();
              timerStore.timerMode = 'rest';
              timerStore.roundCount += 1;
              timerStore.currentBreakTimeRemaining = timerStore.breakTime;
            }
          } else if (timerStore.timerMode === 'rest') {
            if (timerStore.currentBreakTimeRemaining > 0) {
              timerStore.currentBreakTimeRemaining -= 1;
            }
            if (timerStore.currentBreakTimeRemaining === 0) {
              // Play sound when rest ends
              audio.currentTime = 0;
              audio.play();
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
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
