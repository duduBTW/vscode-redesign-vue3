<script setup lang="ts">
import "./xterm.css";
import Button from "../../core/Button.vue";
</script>

<template>
  <div class="bg-zinc-800 p-2 rounded-lg mt-3 flex gap-3">
    <div class="flex flex-col gap-1 p-1 w-36">
      <Button
        class="!justify-start before:absolute before:bg-blue-400 before:h-4 before:w-1 relative before:left-0 before:rounded-full before:content-['']"
        variant="secondary"
        >node</Button
      >
      <Button class="!justify-start" variant="ghost">powershell</Button>
      <Button class="!justify-start" variant="ghost">powershell</Button>
    </div>
    <div class="flex flex-col flex-1 gap-3">
      <div class="flex bg-zinc-700 rounded-lg p-1">
        <Button
          variant="ghost"
          class="before:absolute before:bg-blue-400 before:w-4 before:h-1 relative before:bottom-0 before:rounded-full before:content-['']"
          >Terminal</Button
        >
        <Button variant="ghost" class="text-zinc-400 font-normal"
          >Problems</Button
        >
        <Button variant="ghost" class="text-zinc-400 font-normal"
          >Output</Button
        >
      </div>

      <div id="xterm-container" class="h-44" />
    </div>
  </div>
</template>
