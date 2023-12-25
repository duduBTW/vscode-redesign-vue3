<script setup lang="ts">
defineProps<{ isActive: boolean }>();
</script>

<template>
  <button
    class="px-4 py-2 rounded-t-lg flex items-center gap-2 border-t-2 border-r border-l border-transparent hover:border-zinc-800 cursor-pointer hover:text-gray-100 transition-colors flex-shrink-0"
    :class="{
      'bg-zinc-800 text-gray-100 hover:bg-zinc-800': isActive,
      'text-gray-400': !isActive,
    }"
  >
    <slot />
  </button>
</template>
