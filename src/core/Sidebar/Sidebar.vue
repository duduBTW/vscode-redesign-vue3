<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import useSidebarStore, {
  SIDEBAR_UPPER_DATA,
  SIDEBAR_LOWER_DATA,
} from "../../core/store/sidebarStore";
import useTabsStore from "../../core/store/tabsStore";

const sidebarStore = useSidebarStore();
const tabsStore = useTabsStore();
</script>

<template>
  <div class="h-full bg-zinc-800 py-2 px-2 rounded-lg flex flex-col gap-3">
    <SidebarItem
      v-for="sidebarItem in SIDEBAR_UPPER_DATA"
      :active="sidebarStore.isSidebarItemActive(sidebarItem)"
      @click="sidebarStore.selectSidebar(sidebarItem)"
    >
      <component :is="sidebarItem.icon" />
    </SidebarItem>

    <div class="mt-auto" />
    <SidebarItem
      v-for="sidebarItem in SIDEBAR_LOWER_DATA"
      :active="tabsStore.isActive(sidebarItem.page)"
      @click="tabsStore.openTab(sidebarItem.page)"
    >
      <component :is="sidebarItem.icon" />
    </SidebarItem>
  </div>
</template>
