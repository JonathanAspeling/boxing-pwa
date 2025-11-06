<template>
  <svg :class="className" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
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
