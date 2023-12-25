<script setup lang="ts">
import { RiCheckboxIndeterminateLine } from "vue-remix-icons";
import CodeDirectory from "./Directory.vue";
import useFileExplorerStore from "../../../core/store/explorerStore";
import Button from "../../../core/Button.vue";

const fileExplorerStore = useFileExplorerStore();

export type FileLocale = {
  type: "file";
  name: string;
  content?: string;
};

export type Locale =
  | FileLocale
  | {
      type: "folder";
      name: string;
      children?: Locale[];
    };

const explorerData: Locale = {
  name: "project-v",
  type: "folder",
  children: [
    {
      name: "dis",
      type: "folder",
      children: [],
    },
    {
      name: "public",
      type: "folder",
      children: [],
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          type: "file",
          name: "App.vue",
          content: `<div>My Content</div>`,
        },
        {
          type: "file",
          name: "main.ts",
        },
        {
          type: "file",
          name: "index.css",
          content: `
.content: {
  display: flex;
}`,
        },
        {
          type: "folder",
          name: "components",
          children: [
            {
              type: "folder",
              name: "explorer",
              children: [
                {
                  type: "file",
                  name: "Explorer.vue",
                  content: "<div>Explorer</div>",
                },
              ],
            },
          ],
        },
        {
          type: "folder",
          name: "assets",
          children: [
            {
              type: "file",
              name: "vue.svg",
              content: "<svg><p/></svg>",
            },
          ],
        },
      ],
    },
    {
      name: "index.html",
      type: "file",
    },
  ],
};
</script>

<template>
  <div>
    <div class="text-start text-sm font-medium rounded-lg flex justify-between">
      <Button size="sm" variant="ghost">project-v</Button>
      <Button
        size="sm"
        variant="ghost"
        @click="fileExplorerStore.closeAll()"
        title="Collapse all"
      >
        <RiCheckboxIndeterminateLine class="w-3" />
      </Button>
    </div>

    <CodeDirectory
      v-for="route of explorerData.children"
      :locale="route"
      current-locale=""
      class="mr-3"
    />
  </div>
</template>
