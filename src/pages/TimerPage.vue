<script setup>
import TimerWidget from '../components/TimerWidget.vue';
import { useTimerStore } from '../stores/timerstore';

const timerStore = useTimerStore();
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      id="main-timer"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <TimerWidget />
    </div>
    <div
      id="round-indicator"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="m-auto flex-col">
        <div class="text-center">
          <span v-if="timerStore.timerMode === 'round'">Round</span>
          <span v-else>Rest</span>
        </div>
        <div class="text-center">
          <span>{{ timerStore.roundCount }}</span>
        </div>
        <div class="text-center">of {{ timerStore.totalRounds }}</div>
      </div>
    </div>
    <div
      id="timer-controls"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="m-auto flex h-full w-full justify-center">
        <div
          class="flex h-full w-full flex-row items-center justify-center gap-8"
        >
          <button
            class="reset-btn"
            @click="timerStore.resetTimers"
            title="Reset Timer"
            aria-label="Reset Timer"
          >
            <i class="pi pi-refresh" style="color: #fff; font-size: 1.5rem"></i>
          </button>
          <button
            @click="timerStore.toggleTimer"
            :aria-label="timerStore.isRunning ? 'Pause Timer' : 'Start Timer'"
            @click="timerStore.toggleTimer"
          >
            <i
              v-if="timerStore.isRunning"
              class="pi pi-pause"
              style="color: #fff; font-size: 2.25rem"
            ></i>
            <i
              v-else
              class="pi pi-play"
              style="color: #fff; font-size: 2.25rem"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hexagon-btn {
  width: 180px;
  height: 180px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  font-size: 2.25rem;
  cursor: pointer;
  clip-path: polygon(
    25% 6.7%,
    75% 6.7%,
    100% 50%,
    75% 93.3%,
    25% 93.3%,
    0% 50%
  );
  transition: background 0.2s;
  aspect-ratio: 1 / 1;
}
.hexagon-btn:active {
  background: #222;
}

.reset-btn {
  width: 80px;
  height: 80px;
  background: #666;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #888;
}

.reset-btn:active {
  background: #444;
}
</style>
