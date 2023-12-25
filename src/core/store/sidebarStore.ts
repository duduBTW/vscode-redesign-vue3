import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref, shallowRef } from "vue";
import {
  RiFile3Fill,
  RiGitBranchLine,
  RiBugLine,
  RiUser3Fill,
  RiSettings4Fill,
  RiBox2Fill,
} from "vue-remix-icons";
import CodeExplorer from "../../presentation/code/Explorer/Explorer.vue";
import ExtensionFinder from "../../presentation/extension/ExtensionFinder.vue";
import { TabWithArgsType } from "../Tabs/tabs.data";

const useSidebarStore = defineStore("sidebar-store", () => {
  const sideBarExpanded = ref(true);
  const selectedSidebar = ref<SidebarItem>(SIDEBAR_UPPER_DATA[0]);

  function toggleSidebar() {
    sideBarExpanded.value = !sideBarExpanded.value;
  }

  function selectSidebar(sidebarItem: SidebarItem) {
    sideBarExpanded.value = isSidebarItemActive(sidebarItem)
      ? !sideBarExpanded.value
      : true;

    selectedSidebar.value = sidebarItem;
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "b") {
      toggleSidebar();
    }
  }

  function isSidebarItemActive(sidebarItem: SidebarItem) {
    return sidebarItem.title === selectedSidebar.value.title;
  }

  onMounted(() => {
    document.addEventListener("keydown", handleKeyUp);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyUp);
  });

  return {
    sideBarExpanded,
    selectSidebar,
    toggleSidebar,
    isSidebarItemActive,
    selectedSidebar,
  };
});

// ----------------
// Helpers
// ----------------
export type SidebarItem = {
  title: string;
  icon: any;
  content: any;
};

export type SidebarLowerItem = {
  title: string;
  icon: any;
  page?: TabWithArgsType[number];
};

export const SIDEBAR_UPPER_DATA = [
  {
    title: "Explorer",
    content: shallowRef(CodeExplorer),
    icon: RiFile3Fill,
  },
  {
    title: "Extensions",
    content: shallowRef(ExtensionFinder),
    icon: RiBox2Fill,
  },
  {
    title: "Git",
    content: undefined,
    icon: RiGitBranchLine,
  },
  {
    title: "Debugger",
    content: undefined,
    icon: RiBugLine,
  },
] satisfies SidebarItem[];

export const SIDEBAR_LOWER_DATA = [
  {
    title: "User",
    page: {
      type: "user",
      args: {
        id: undefined,
        title: "User",
      },
    },
    icon: RiUser3Fill,
  },
  {
    title: "Settings",
    icon: RiSettings4Fill,
    page: {
      type: "settings",
      args: {
        id: undefined,
        title: "Settings",
      },
    },
  },
] satisfies SidebarLowerItem[];

export default useSidebarStore;
