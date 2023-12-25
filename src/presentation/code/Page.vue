<script setup lang="ts">
import { computed } from "vue";
import "highlight.js";
// import "highlight.js/styles/github-dark.css";
// @ts-ignore
import CodeEditor from "simple-code-editor";
import { CodeEditorTabArgs } from "../../core/Tabs/tabs.data";

const props = defineProps<CodeEditorTabArgs>();
const pathList = computed(() => props.path.split("/"));

function getFileExtension(fileName: string) {
  const dotSplitFileName = fileName.split(".");
  return dotSplitFileName[dotSplitFileName.length - 1];
}
</script>

<template>
  <div class="flex text-sm text-zinc-400">
    <span v-for="(path, index) in pathList" class="ml-1">
      {{ path }} <span v-if="index !== pathList.length - 1">/</span>
    </span>
  </div>
  <CodeEditor
    :header="false"
    :line-nums="true"
    :languages="[['', getFileExtension(path)]]"
    :value="props.content"
    height="100%"
    width="100%"
    padding="16px"
    theme="github-dark"
  />
</template>
