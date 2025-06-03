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
  <div id="app" class="flex h-screen flex-col">
    <div
      id="top-navbar"
      class="flex flex-1/12 justify-center border-2 p-2 text-2xl"
    >
      <div class="flex flex-4/12 justify-center">A</div>
      <div class="flex flex-4/12 justify-center">B</div>
      <div class="flex flex-4/12 justify-center">
        <button
          @click="togglePage"
          class="h-fit rounded bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700"
        >
          {{ showSettings ? 'Timer' : 'Settings' }}
        </button>
      </div>
    </div>
    <div class="flex-11/12">
      <TimerPage v-if="!showSettings" />
      <SettingsPage v-else />
    </div>
  </div>
</template>

<style scoped></style>
