<template>
  <div class="flex h-full flex-col px-4 py-6">
    <h1 class="mb-6 text-center text-2xl font-bold text-white">Settings</h1>
    <div class="mb-6 flex flex-col items-center">
      <label for="total-rounds" class="mb-2 font-semibold text-zinc-300"
        >Total Rounds</label
      >
      <InputNumber
        id="total-rounds"
        v-model="timerStore.totalRounds"
        :min="1"
        :max="100"
        showButtons
        buttonLayout="horizontal"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        inputClass="text-center"
      />
    </div>
    <div class="mb-6 flex flex-col items-center">
      <label for="round-time" class="mb-2 font-semibold text-zinc-300"
        >Round Time (sec)</label
      >
      <InputNumber
        id="round-time"
        v-model="timerStore.roundTime"
        suffix=" sec"
        size="small"
        :min="1"
        :max="3600"
        inputClass="text-center"
        showButtons
        buttonLayout="horizontal"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        fluid
      />
    </div>
    <div class="mb-6 flex flex-col items-center">
      <label for="break-time" class="mb-2 font-semibold text-zinc-300"
        >Rest Time (sec)</label
      >
      <InputNumber
        id="break-time"
        v-model="timerStore.breakTime"
        suffix=" sec"
        size="small"
        :min="0"
        :max="3600"
        inputClass="text-center"
        showButtons
        buttonLayout="horizontal"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        fluid
      />
    </div>
    <!-- Settings content goes here -->
  </div>
</template>

<script setup>
import { useTimerStore } from '../stores/timerstore';
import InputNumber from 'primevue/inputnumber';

const timerStore = useTimerStore();
</script>
