<script setup lang="ts">
import { RiCloseLine } from "vue-remix-icons";
import Tab from "./Tab.vue";
import useTabsStore from "../../core/store/tabsStore";
// import ProgrammingIcon from "../../presentation/code/ProgrammingIcon.vue";

const tabsStore = useTabsStore();
</script>

<template>
  <div
    class="flex items-baseline flex-nowrap overflow-x-auto overflow-y-hidden w-auto relative no-scrollbar"
  >
    <Tab
      v-for="tab in tabsStore.openTabs"
      :is-active="
        tabsStore.isActive({
          type: tab.type,
          args: {
            id: tab.args.id,
          },
        })
      "
      @click="tabsStore.setSelectedTab(tab)"
      @click.middle="tabsStore.closeTtab(tab)"
    >
      <!-- <ProgrammingIcon :file-name="tab.args.title" class="text-base" /> -->

      {{ tab.args.title }}

      <button
        class="ml-1 -m-1 p-1 fill-zinc-600 rounded-lg hover:bg-zinc-700 hover:fill-zinc-300 active:scale-95 transition-al"
        @click.stop="tabsStore.closeTtab(tab)"
      >
        <RiCloseLine class="w-5 h-5" />
      </button>
    </Tab>
  </div>
</template>
