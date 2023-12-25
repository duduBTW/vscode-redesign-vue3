<script lang="ts">
export default {
  name: "code-directory",
};
</script>

<script setup lang="ts">
import {
  RiFolder5Fill,
  RiFolderOpenFill,
  RiArrowRightSLine,
} from "vue-remix-icons";
import ProgrammingIcon from "../ProgrammingIcon.vue";
import { computed } from "vue";
import { Locale } from "./Explorer.vue";
import useTabsStore from "../../../core/store/tabsStore";
import useFileExplorerStore from "../../../core/store/explorerStore";

const tabsStore = useTabsStore();
const fileExplorerStore = useFileExplorerStore();

const props = defineProps<{
  locale: Locale;
  currentLocale: string;
}>();

const path = computed(() => `${props.currentLocale}/${props.locale.name}`);

const handleLocaleClick = (locale: Locale) => {
  if (locale.type === "folder") {
    fileExplorerStore.toggleFolder(path.value);
    return;
  }

  tabsStore.openTab({
    type: "code-editor",
    args: {
      content: locale.content ?? "",
      id: path.value,
      title: locale.name,
      path: path.value,
    },
  });
};

const isActive = computed(() =>
  tabsStore.isActive({
    type: "code-editor",
    args: {
      id: path.value,
    },
  })
);

const isExpanded = computed(() => fileExplorerStore.isExpanded(path.value));
</script>

<template>
  <div class="pl-4">
    <button
      class="w-full flex items-center gap-2 p-2 hover:bg-blue-900/20 rounded-lg transition-colors"
      @click="handleLocaleClick(locale)"
      :class="{
        'bg-accent hover:bg-accent': isActive,
      }"
    >
      <RiArrowRightSLine
        class="fill-gray-500 w-4 h-4 transition-transform duration-150"
        :class="{
          'opacity-0': locale.type === 'file',
          'rotate-90': isExpanded,
        }"
      />

      <div class="w-3 h-3">
        <ProgrammingIcon
          v-if="locale.type === 'file'"
          :fileName="props.locale.name"
        />
        <div v-else="locale.type === 'folder'" class="fill-gray-500">
          <RiFolderOpenFill v-if="isExpanded" />
          <RiFolder5Fill v-else />
        </div>
      </div>
      <div class="text-sm">{{ locale.name }}</div>
    </button>

    <div
      v-if="
        locale.type === 'folder' &&
        locale.children &&
        locale.children.length > 0 &&
        fileExplorerStore.isExpanded(path)
      "
    >
      <code-directory
        v-for="childrenLocale of locale.children"
        :locale="childrenLocale"
        :currentLocale="`${currentLocale}/${locale.name}`"
      />
    </div>
  </div>
</template>
