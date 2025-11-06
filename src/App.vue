<script setup>
import { ref } from 'vue';
import TimerPage from './pages/TimerPage.vue';
import SettingsPage from './pages/SettingsPage.vue';

const showSettings = ref(false);
const togglePage = () => {
  showSettings.value = !showSettings.value;
};
</script>

<template>
  <div
    id="app"
    class="flex h-screen flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between bg-zinc-800 px-4 py-3 sm:px-6"
    >
      <h1 class="text-lg font-medium text-white">Boxing Timer</h1>
      <button
        @click="togglePage"
        class="flex h-8 w-8 items-center justify-center gap-2 rounded-md text-zinc-300 transition hover:bg-zinc-700 hover:text-white sm:gap-3"
        :aria-label="showSettings ? 'Go to Timer' : 'Go to Settings'"
      >
        <i class="pi pi-cog text-lg"></i>
        <span class="hidden text-sm sm:inline">{{
          showSettings ? 'Timer' : 'Settings'
        }}</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-hidden">
      <TimerPage v-if="!showSettings" />
      <SettingsPage v-else />
    </div>
  </div>
</template>

<style scoped></style>
