<script setup lang="ts">
import { RiFile3Line } from "vue-remix-icons";

const props = defineProps<{
  fileName: string;
}>();

function getFileExtension(fileName: string) {
  const dotSplitFileName = fileName.split(".");
  return dotSplitFileName[dotSplitFileName.length - 1];
}

function fileNameToIconName(fileName: string) {
  switch (getFileExtension(fileName)) {
    case "css":
      return "css3";
    case "vue":
      return "vuejs";
    case "tsx":
    case "jsx":
      return "react";
    case "html":
      return "html5";
    case "ts":
      return "typescript";

    default:
      break;
  }
}

const iconName = fileNameToIconName(props.fileName);
</script>

<template>
  <div>
    <div
      class="text-xs text-gray-400"
      v-if="iconName !== undefined"
      :class="`devicon-${iconName}-plain`"
    />
    <RiFile3Line v-else class="fill-gray-400" />
  </div>
</template>
