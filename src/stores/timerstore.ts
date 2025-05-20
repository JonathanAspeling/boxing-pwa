import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTimerStore = defineStore('timerstore', () => {
  const roundTime = ref(180);
  const breakTime = ref(60);
  const isRunning = ref(false);
  const currentRoundTimeRemaining = ref(180);
  const currentBreakTimeRemaining = ref(60);

  function toggleTimer() {
    isRunning.value = !isRunning.value;
  }

  // Watch for changes to roundTime and breakTime
  watch(roundTime, (newValue) => {
    currentRoundTimeRemaining.value = newValue;
  });

  watch(breakTime, (newValue) => {
    currentBreakTimeRemaining.value = newValue;
  });

  return {
    roundTime,
    breakTime,
    isRunning,
    toggleTimer,
    currentRoundTimeRemaining,
    currentBreakTimeRemaining,
  };
});
