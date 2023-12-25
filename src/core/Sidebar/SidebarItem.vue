<script setup lang="ts">
import Button from "../Button.vue";
defineProps<{
  active: boolean;
}>();
</script>

<template>
  <Button
    size="icon"
    :variant="active ? 'secondary' : 'ghost'"
    :class="{
      'fill-zinc-100': active,
      'fill-zinc-500': !active,
    }"
  >
    <div class="w-5 h-5">
      <slot />
    </div>
  </Button>
</template>
