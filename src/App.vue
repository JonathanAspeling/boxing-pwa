<script setup>
import Timer from './components/Timer.vue';
import { useTimerStore } from './stores/timerstore';

const timerStore = useTimerStore();
</script>

<template>
  <div id="app" class="flex h-screen flex-col">
    <!-- Blank canvas -->
    <div
      id="top-navbar"
      class="flex flex-2/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="flex flex-4/12 justify-center">A</div>
      <div class="flex flex-4/12 justify-center">B</div>
      <div class="flex flex-4/12 justify-center">C</div>
    </div>
    <div
      id="main-timer"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <Timer />
    </div>
    <div
      id="round-indicator"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="m-auto flex-col">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>
    </div>
    <div
      id="timer-controls"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="m-auto flex h-full w-full justify-center">
        <div class="flex h-full w-full flex-col justify-center">
          <div class="self-center">A</div>
          <div class="self-center">B</div>
          <div class="self-center">C</div>
          <div class="self-center">D</div>
        </div>
        <div class="flex h-full w-full flex-col justify-center">
          <div class="self-center">
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded"
              @click="timerStore.toggleTimer"
            >
              {{ timerStore.isRunning ? 'Stop' : 'Start' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Blank canvas */
</style>
