<script setup lang="ts">
import Tabs from "./Tabs/Tabs.vue";
import useSidebarStore from "./store/sidebarStore";
import SideBar from "./Sidebar/Sidebar.vue";
import CodeTerminal from "../presentation/code/Terminal.vue";
import useTerminalStore from "./store/terminalStore";
import useTabsStore from "./store/tabsStore";

const terminalStore = useTerminalStore();
const sidebarStore = useSidebarStore();
const tabsStore = useTabsStore();
</script>

<template>
  <div class="flex gap-3 bg-zinc-900 h-full p-4">
    <SideBar />
    <div
      class="h-full w-80 bg-zinc-800 rounded-lg flex flex-col"
      v-if="
        sidebarStore.sideBarExpanded && sidebarStore.selectedSidebar.content
      "
    >
      <component :is="sidebarStore.selectedSidebar.content" />
    </div>
    <main class="flex-1 flex flex-col">
      <Tabs />
      <div
        class="bg-zinc-800 p-3 rounded-b-lg rounded-tr-lg flex-1 flex flex-col gap-3"
        v-if="sidebarStore.selectedSidebar && tabsStore.openTabs.length > 0"
        :class="{ 'rounded-tl-lg': !tabsStore.isFirstTabSelected }"
      >
        <slot />
      </div>
      <div v-else class="grid h-full place-items-end">
        <img
          src="https://i.redd.it/1f1a3vcnypj71.gif"
          class="pointer-events-none select-none animate-bounce w-20"
        />
      </div>

      <CodeTerminal v-show="terminalStore.terminalOpen" />
    </main>
  </div>
</template>
