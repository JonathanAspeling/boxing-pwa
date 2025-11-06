<template>
  <div class="flex h-full flex-col overflow-hidden p-3 sm:p-4">
    <!-- Centered heading section -->
    <div class="mb-4 flex-shrink-0 text-center sm:mb-6">
      <h1 class="mb-1 text-2xl text-white sm:mb-2 sm:text-3xl md:text-4xl">
        Settings
      </h1>
      <p class="text-xs text-zinc-500 sm:text-sm md:text-base">
        Configure your boxing timer
      </p>
    </div>

    <!-- Setting Controls - Scrollable if needed -->
    <div class="flex min-h-0 flex-1 flex-col justify-center">
      <div class="space-y-3 overflow-y-auto sm:space-y-4">
        <!-- Total Rounds -->
        <div class="setting-card">
          <label
            class="mb-2 block text-center text-xs text-zinc-400 sm:mb-3 sm:text-sm"
            >Total Rounds</label
          >
          <div class="flex items-center justify-center gap-2 sm:gap-3">
            <button @click="decrementRounds" class="control-btn">
              <i class="pi pi-minus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>

            <div
              class="min-w-[80px] text-center sm:min-w-[100px] md:min-w-[120px]"
            >
              <span
                class="text-2xl text-white tabular-nums sm:text-3xl md:text-4xl"
                >{{ timerStore.totalRounds }}</span
              >
            </div>

            <button @click="incrementRounds" class="control-btn">
              <i class="pi pi-plus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>
          </div>
        </div>

        <!-- Round Time -->
        <div class="setting-card">
          <label
            class="mb-2 block text-center text-xs text-zinc-400 sm:mb-3 sm:text-sm"
            >Round Time</label
          >
          <div class="flex items-center justify-center gap-2 sm:gap-3">
            <button @click="decrementRoundTime" class="control-btn">
              <i class="pi pi-minus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>

            <div
              class="min-w-[80px] text-center sm:min-w-[100px] md:min-w-[120px]"
            >
              <span
                class="text-2xl text-white tabular-nums sm:text-3xl md:text-4xl"
                >{{ timerStore.roundTime }}</span
              >
              <span
                class="ml-1 text-sm text-zinc-500 sm:ml-2 sm:text-lg md:text-xl"
                >sec</span
              >
            </div>

            <button @click="incrementRoundTime" class="control-btn">
              <i class="pi pi-plus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>
          </div>
        </div>

        <!-- Rest Time -->
        <div class="setting-card">
          <label
            class="mb-2 block text-center text-xs text-zinc-400 sm:mb-3 sm:text-sm"
            >Rest Time</label
          >
          <div class="flex items-center justify-center gap-2 sm:gap-3">
            <button @click="decrementRestTime" class="control-btn">
              <i class="pi pi-minus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>

            <div
              class="min-w-[80px] text-center sm:min-w-[100px] md:min-w-[120px]"
            >
              <span
                class="text-2xl text-white tabular-nums sm:text-3xl md:text-4xl"
                >{{ timerStore.breakTime }}</span
              >
              <span
                class="ml-1 text-sm text-zinc-500 sm:ml-2 sm:text-lg md:text-xl"
                >sec</span
              >
            </div>

            <button @click="incrementRestTime" class="control-btn">
              <i class="pi pi-plus h-4 w-4 sm:h-5 sm:w-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Presets Section -->
    <div class="mt-4 flex-shrink-0 sm:mt-6">
      <p class="mb-2 text-center text-xs text-zinc-500 sm:mb-3 sm:text-sm">
        Quick Presets
      </p>
      <div class="flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
        <button @click="setPreset('amateur')" class="preset-btn">
          Amateur (3x3)
        </button>
        <button @click="setPreset('pro')" class="preset-btn">Pro (10x3)</button>
        <button @click="setPreset('championship')" class="preset-btn">
          Championship (12x3)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimerStore } from '../stores/timerstore';

const timerStore = useTimerStore();

// Rounds controls
const incrementRounds = () => {
  if (timerStore.totalRounds < 100) {
    timerStore.totalRounds++;
  }
};

const decrementRounds = () => {
  if (timerStore.totalRounds > 1) {
    timerStore.totalRounds--;
  }
};

// Round time controls
const incrementRoundTime = () => {
  if (timerStore.roundTime < 3600) {
    timerStore.roundTime += 15; // Increment by 15 seconds
  }
};

const decrementRoundTime = () => {
  if (timerStore.roundTime > 15) {
    timerStore.roundTime -= 15; // Decrement by 15 seconds
  }
};

// Rest time controls
const incrementRestTime = () => {
  if (timerStore.breakTime < 3600) {
    timerStore.breakTime += 15; // Increment by 15 seconds
  }
};

const decrementRestTime = () => {
  if (timerStore.breakTime > 0) {
    timerStore.breakTime -= 15; // Decrement by 15 seconds
  }
};

// Preset configurations
const setPreset = (preset) => {
  switch (preset) {
    case 'amateur':
      timerStore.totalRounds = 3;
      timerStore.roundTime = 180;
      timerStore.breakTime = 60;
      break;
    case 'pro':
      timerStore.totalRounds = 10;
      timerStore.roundTime = 180;
      timerStore.breakTime = 60;
      break;
    case 'championship':
      timerStore.totalRounds = 12;
      timerStore.roundTime = 180;
      timerStore.breakTime = 60;
      break;
  }
  // Reset timer values when preset is changed
  timerStore.currentRoundTimeRemaining = timerStore.roundTime;
  timerStore.currentBreakTimeRemaining = timerStore.breakTime;
  timerStore.timerMode = 'round';
  timerStore.roundCount = 0;
  timerStore.isRunning = false;
};
</script>

<style scoped>
.setting-card {
  background: linear-gradient(
    135deg,
    rgba(39, 39, 42, 1) 0%,
    rgba(24, 24, 27, 1) 100%
  );
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(63, 63, 70, 1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

@media (min-width: 640px) {
  .setting-card {
    border-radius: 1rem;
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .setting-card {
    padding: 1.25rem;
  }
}

.control-btn {
  padding: 0.5rem;
  background: rgba(39, 39, 42, 1);
  color: rgba(161, 161, 170, 1);
  border: 1px solid rgba(63, 63, 70, 1);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 2.5rem;
  min-height: 2.5rem;
}

.control-btn:hover {
  background: rgba(63, 63, 70, 1);
}

.control-btn:active {
  transform: scale(0.95);
}

@media (min-width: 640px) {
  .control-btn {
    padding: 0.75rem;
    border-radius: 0.75rem;
    min-width: 3rem;
    min-height: 3rem;
  }
}

.preset-btn {
  padding: 0.5rem 0.75rem;
  background: rgba(39, 39, 42, 1);
  color: rgba(161, 161, 170, 1);
  border: 1px solid rgba(63, 63, 70, 1);
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  cursor: pointer;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preset-btn:hover {
  background: rgba(63, 63, 70, 1);
}

@media (min-width: 640px) {
  .preset-btn {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

@media (min-width: 768px) {
  .preset-btn {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
  }
}

/* Ensure the main container uses full height properly */
@media (max-height: 600px) {
  .setting-card {
    padding: 0.5rem;
  }

  .control-btn {
    padding: 0.375rem;
    min-width: 2rem;
    min-height: 2rem;
  }

  .preset-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    min-height: 2rem;
  }
}
</style>
