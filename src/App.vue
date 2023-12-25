<script setup lang="ts">
import Layout from "./core/Layout.vue";
import { tabToContentMapping } from "./core/Tabs/tabs.data";
import useTabsStore from "./core/store/tabsStore";

const tabsStore = useTabsStore();
</script>

<template>
  <Layout>
    <div
      class="flex flex-col h-full"
      v-if="tabsStore.selectedTab !== undefined"
    >
      <component
        :is="tabToContentMapping[tabsStore.selectedTab.type]"
        v-bind="tabsStore.selectedTab.args"
        :key="`${tabsStore.selectedTab.type}-${tabsStore.selectedTab.args.id}`"
      />
    </div>
  </Layout>
</template>
