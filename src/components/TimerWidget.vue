<script setup>
import { useTimerStore } from '../stores/timerstore';
import { watch, ref, onUnmounted } from 'vue';

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

// Cleanup function to clear interval safely
const clearTimerInterval = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

// Clean up interval when component unmounts
onUnmounted(() => {
  clearTimerInterval();
});

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

      // Always clear any existing interval before creating a new one
      clearTimerInterval();

      // Create new interval only if none exists
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
              clearTimerInterval();
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
    } else {
      // Timer stopped - clear interval
      clearTimerInterval();
    }
  },
);
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="timer-display text-center text-white tabular-nums">
      {{
        timerStore.timerMode === 'round'
          ? formatTime(timerStore.currentRoundTimeRemaining)
          : formatTime(timerStore.currentBreakTimeRemaining)
      }}
    </div>
  </div>
</template>

<style scoped>
.timer-display {
  font-size: 4.5rem;
  font-weight: 300;
  letter-spacing: -0.05em;
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
}

@media (min-width: 640px) {
  .timer-display {
    font-size: 6rem;
  }
}
</style>
