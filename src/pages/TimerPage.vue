<script setup>
import { ref, computed } from 'vue';
import TimerWidget from '../components/TimerWidget.vue';
import { useTimerStore } from '../stores/timerstore';

const timerStore = useTimerStore();
const showResetConfirmation = ref(false);
const resetPressTimer = ref(null);

// Computed property for status state and colors
const statusState = computed(() => {
  if (
    timerStore.roundCount >= timerStore.totalRounds &&
    !timerStore.isRunning
  ) {
    return 'complete';
  } else if (timerStore.isRunning) {
    return timerStore.timerMode === 'round' ? 'round' : 'rest';
  } else {
    return 'ready';
  }
});

const getStateColor = computed(() => {
  switch (statusState.value) {
    case 'round':
      return 'from-red-600 to-red-700';
    case 'rest':
      return 'from-emerald-600 to-emerald-700';
    case 'complete':
      return 'from-amber-600 to-amber-700';
    case 'ready':
    default:
      return 'from-zinc-700 to-zinc-800';
  }
});

const getStatusLabel = computed(() => {
  switch (statusState.value) {
    case 'round':
      return 'ROUND IN PROGRESS';
    case 'rest':
      return 'REST IN PROGRESS';
    case 'complete':
      return 'FIGHT COMPLETE';
    case 'ready':
    default:
      return 'READY TO START';
  }
});

const handleResetPress = () => {
  // Quick tap - reset current timer only
  timerStore.resetTimers();
};

const handleResetMouseDown = () => {
  resetPressTimer.value = setTimeout(() => {
    showResetConfirmation.value = true;
  }, 500);
};

const handleResetMouseUp = () => {
  if (resetPressTimer.value) {
    clearTimeout(resetPressTimer.value);
    resetPressTimer.value = null;
  }
};

const confirmFullReset = () => {
  timerStore.resetTimers();
  timerStore.roundCount = 0;
  showResetConfirmation.value = false;
};

const cancelReset = () => {
  showResetConfirmation.value = false;
};
</script>

<template>
  <div class="flex h-full flex-col px-4 py-6">
    <!-- Status Bar -->
    <transition name="status-bar" mode="out-in" appear>
      <div
        :key="statusState"
        :class="[
          'mb-6 rounded-xl bg-gradient-to-r p-3 text-center shadow-2xl sm:mb-8 sm:rounded-2xl sm:p-4',
          getStateColor,
        ]"
      >
        <div class="mb-1 text-sm text-white opacity-90 sm:text-base">
          {{ getStatusLabel }}
        </div>
        <div class="flex items-center justify-center gap-3 text-white sm:gap-4">
          <span class="text-lg sm:text-xl"
            >Round {{ timerStore.roundCount || 1 }}</span
          >
          <div class="h-5 w-1 rounded-full bg-white/30 sm:h-6"></div>
          <span class="text-lg sm:text-xl"
            >of {{ timerStore.totalRounds }}</span
          >
        </div>
      </div>
    </transition>

    <!-- Timer Display -->
    <div class="relative mb-8 flex-1">
      <div class="timer-container relative mx-auto max-w-sm">
        <!-- Decorative blur circles -->
        <div
          class="absolute -top-3 -left-3 h-20 w-20 rounded-full bg-red-600/20 blur-xl sm:h-24 sm:w-24"
        ></div>
        <div
          class="absolute -right-3 -bottom-3 h-24 w-24 rounded-full bg-blue-600/20 blur-xl sm:h-32 sm:w-32"
        ></div>

        <!-- Timer card with glow effect -->
        <div
          class="timer-card relative rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 p-12 shadow-2xl sm:rounded-3xl sm:p-16"
          :class="{
            'timer-glow-red': timerStore.timerMode === 'round',
            'timer-glow-green': timerStore.timerMode === 'rest',
          }"
        >
          <TimerWidget />
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex flex-col items-center">
      <div class="mb-3 flex items-center justify-center gap-6">
        <button
          class="reset-btn"
          @click="handleResetPress"
          @mousedown="handleResetMouseDown"
          @mouseup="handleResetMouseUp"
          @touchstart="handleResetMouseDown"
          @touchend="handleResetMouseUp"
          title="Reset Timer"
          aria-label="Reset Timer"
        >
          <i class="pi pi-refresh"></i>
        </button>

        <button
          class="play-btn"
          @click="timerStore.toggleTimer"
          :aria-label="timerStore.isRunning ? 'Pause Timer' : 'Start Timer'"
        >
          <i v-if="timerStore.isRunning" class="pi pi-pause"></i>
          <i v-else class="pi pi-play"></i>
        </button>
      </div>

      <!-- Hint text -->
      <p class="text-center text-xs text-zinc-400 sm:text-sm">
        Tap to reset timer • Hold to reset all rounds
      </p>
    </div>

    <!-- Reset Confirmation Modal -->
    <div
      v-if="showResetConfirmation"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      @click="cancelReset"
    >
      <div
        class="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-800 p-6 shadow-2xl"
        @click.stop
      >
        <h3 class="mb-2 text-lg font-semibold text-white">Reset All Rounds?</h3>
        <p class="mb-6 text-zinc-300">
          This will reset the entire workout and start from Round 1.
        </p>

        <div class="flex gap-3">
          <button
            @click="cancelReset"
            class="flex-1 rounded-lg bg-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            @click="confirmFullReset"
            class="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Status bar transition animations */
.status-bar-enter-active,
.status-bar-leave-active {
  transition: all 0.3s ease;
}

.status-bar-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.status-bar-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.timer-glow-red {
  box-shadow:
    0 0 30px rgba(220, 38, 38, 0.3),
    0 0 60px rgba(220, 38, 38, 0.1);
}

.timer-glow-green {
  box-shadow:
    0 0 30px rgba(34, 197, 94, 0.3),
    0 0 60px rgba(34, 197, 94, 0.1);
}

.reset-btn {
  padding: 1.25rem;
  background: rgba(113, 113, 122, 0.8);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.25rem;
  user-select: none;
  transform: scale(1);
}

.reset-btn:hover {
  background: rgba(161, 161, 170, 0.9);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.reset-btn:active {
  background: rgba(82, 82, 91, 0.9);
  transform: translateY(0) scale(0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.play-btn {
  padding: 1.75rem;
  background: #dc2626;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.5rem;
  box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.4);
  user-select: none;
  transform: scale(1);
}

.play-btn:hover {
  background: #b91c1c;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 30px 0 rgba(220, 38, 38, 0.5);
}

.play-btn:active {
  background: #991b1b;
  transform: translateY(0) scale(0.95);
  box-shadow: 0 2px 8px 0 rgba(220, 38, 38, 0.4);
}

@media (min-width: 640px) {
  .reset-btn {
    padding: 1.5rem;
  }

  .play-btn {
    padding: 2rem;
  }
}
</style>
