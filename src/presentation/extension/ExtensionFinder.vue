<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import useTabsStore from "../../core/store/tabsStore";
import json from "./data.json";
import Fuse from "fuse.js";

const searchTerm = ref("");
const tabsStore = useTabsStore();

export type ExtensionDto = {
  id: string;
  name: string;
  picture: string;
  company: string;
  price: string;
  email: string;
  description: string;
  registered: string;
  tags: string[];
};

const fuse = new Fuse(json, {
  keys: ["name"],
  isCaseSensitive: false,
});

async function getExtensions(): Promise<ExtensionDto[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let result = json;

  if (searchTerm.value) {
    result = fuse.search(searchTerm.value).map(({ item }) => item);
  }

  // limits result
  return result.slice(0, 20);
}

const { data } = useQuery({
  queryKey: ["search-entry-anime", searchTerm],
  queryFn: getExtensions,
});
</script>

<template>
  <div class="flex">
    <input
      type="text"
      placeholder="Search..."
      v-model="searchTerm"
      class="flex-1 h-9 rounded-md border border-zinc-700 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mx-3 mt-3 mb-2"
    />
  </div>
  <div class="overflow-y-auto no-scrollbar flex flex-col">
    <button
      v-for="item in data"
      @click="
        tabsStore.openTab({
          type: 'extension-item',
          args: {
            ...item,
            title: item.name,
          },
        })
      "
      :key="item.id"
      class="flex gap-2 px-3 py-3 hover:bg-blue-900/20 active:bg-zinc-700 active:transition-colors"
      :class="{
        'bg-accent': tabsStore.isActive({
          type: 'extension-item',
          args: {
            id: item.id,
          },
        }),
      }"
    >
      <div class="w-20 h-20 rounded-lg overflow-hidden">
        <img :src="item.picture" class="object-cover w-full h-full" />
      </div>
      <div class="flex flex-col h-full flex-1 text-start">
        <div class="font-medium line-clamp-1">{{ item.name }}</div>
        <div class="text-zinc-500 line-clamp-1 text-sm">
          {{ item.description }}
        </div>
        <div class="text-zinc-500 line-clamp-1 text-xs mt-auto">
          by {{ item.company }}
        </div>
      </div>
    </button>
  </div>
</template>
