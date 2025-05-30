<script setup>
import Timer from './components/Timer.vue';
import { useTimerStore } from './stores/timerstore';
import InputNumber from 'primevue/inputnumber';

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
        <div>
          <span v-if="timerStore.timerMode === 'round'">Round</span>
          <span v-else>Rest</span>
        </div>
        <div>
          <span>{{ timerStore.roundCount }}</span>
        </div>
        <div>C</div>
      </div>
    </div>
    <div
      id="timer-controls"
      class="flex flex-10/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="m-auto flex h-full w-full justify-center">
        <div class="flex h-full w-full flex-col justify-center">
          <div class="self-center">Round</div>
          <div class="self-center">
            <InputNumber
              class="scale-90 py-2"
              v-model="timerStore.roundTime"
              suffix=" sec"
              size="small"
              :min="1"
              :max="3600"
              :readonly="timerStore.isRunning"
              inputClass="text-center"
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              fluid
            />
          </div>
          <div class="self-center">Rest</div>
          <div class="self-center">
            <InputNumber
              class="scale-90 py-2"
              v-model="timerStore.breakTime"
              suffix=" sec"
              size="small"
              :min="0"
              :max="3600"
              :readonly="timerStore.isRunning"
              inputClass="text-center"
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              fluid
            />
          </div>
        </div>
        <div class="flex h-full w-full flex-col justify-center">
          <div class="self-center">
            <button
              class="hexagon-btn scale-90"
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
  </div>
</template>

<style scoped>
/* Blank canvas */
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
  font-size: 2.25rem; /* Increased by 50% from 1.5rem */
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
</style>
