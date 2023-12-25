<script setup lang="ts">
import { ExtensionDto } from "./ExtensionFinder.vue";
import Button from "../../core/Button.vue";

defineProps<ExtensionDto>();
</script>

<template>
  <div class="w-[1200px] mx-auto px-4 pt-8">
    <div class="flex items-center gap-6">
      <div class="w-20 h-20 rounded-full overflow-hidden">
        <img :src="picture" class="object-cover w-full h-full" />
      </div>
      <div class="flex-1 text-start">
        <div class="font-medium text-xl">{{ name }}</div>
        <div class="text-zinc-300 line-clamp-1 text-sm mt-1">
          by {{ company }} at {{ registered }}
        </div>
      </div>
      <Button> Install - {{ price }} </Button>
    </div>

    <div class="w-full h-px bg-zinc-700 my-8" />

    <p class="text-zinc-400">
      {{ description }}
    </p>

    <div class="flex gap-2 my-8">
      <div
        v-for="tag in tags"
        :key="tag"
        class="px-2 py-1 bg-zinc-700 rounded-lg text-sm"
      >
        {{ tag }}
      </div>
    </div>
  </div>
</template>
