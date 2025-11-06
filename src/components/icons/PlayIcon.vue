<template>
  <svg :class="className" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: 'h-6 w-6',
  },
});
</script>
