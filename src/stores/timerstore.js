import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTimerStore = defineStore('timerstore', () => {
  const roundTime = ref(180);
  const breakTime = ref(60);
  const isRunning = ref(false);
  const currentRoundTimeRemaining = ref(180);
  const currentBreakTimeRemaining = ref(60);
  const timerMode = ref('round');
  const roundCount = ref(0);
  const totalRounds = ref(10);

  function toggleTimer() {
    isRunning.value = !isRunning.value;
  }

  function resetTimers() {
    currentRoundTimeRemaining.value = roundTime.value;
    currentBreakTimeRemaining.value = breakTime.value;
    timerMode.value = 'round';
  }

  // Watch for changes to roundTime and breakTime
  watch(roundTime, (newValue) => {
    if (!isRunning.value) {
      currentRoundTimeRemaining.value = newValue;
    }
  });

  watch(breakTime, (newValue) => {
    if (!isRunning.value) {
      currentBreakTimeRemaining.value = newValue;
    }
  });

  return {
    roundTime,
    breakTime,
    isRunning,
    toggleTimer,
    currentRoundTimeRemaining,
    currentBreakTimeRemaining,
    timerMode,
    roundCount,
    resetTimers,
    totalRounds,
  };
});
