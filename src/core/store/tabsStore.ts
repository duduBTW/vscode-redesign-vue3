import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { TabWithArgsType } from "../Tabs/tabs.data";
import useFileExplorerStore from "./explorerStore";

const useTabsStore = defineStore("tabs", () => {
  const { expandUntilFile } = useFileExplorerStore();

  const selectedTab = ref<TabWithArgsType[number]>();
  const openTabs = reactive<TabWithArgsType[number][]>([]);
  const selectedTabHistory = reactive<TabWithArgsType[number][]>([]);

  const isFirstTabSelected = computed(() => {
    return isActive(openTabs[0]);
  });

  /** Open a new tab */
  function openTab(newTab: TabWithArgsType[number]) {
    // add tab when tab is not open
    if (!isTabAlreadyOpen(newTab, openTabs)) {
      openTabs.push(newTab);
    }

    selectedTab.value = newTab;
    addTabToStory(newTab);
  }

  /** Close a open tab */
  function closeTab(tabToRemove: TabWithArgsType[number]) {
    const tabToRemoveIndex = openTabs.indexOf(tabToRemove);
    if (tabToRemoveIndex === -1) {
      return;
    }

    // remove open tab
    openTabs.splice(tabToRemoveIndex, 1);

    if (!isActive(tabToRemove)) {
      return;
    }

    // change focus if active tab was removed
    const lastOpenTab = getLastOpenTab(openTabs);
    const lastSelectedTab = getLastOpenSelectedTab(
      selectedTabHistory,
      openTabs
    );
    const hasLastSelectedTab =
      lastSelectedTab && openTabs.includes(lastSelectedTab);

    selectedTab.value = hasLastSelectedTab ? lastSelectedTab : lastOpenTab;
  }

  /** Select a open tab */
  function setSelectedTab(newTab: TabWithArgsType[number]) {
    // sets new tab value
    selectedTab.value = newTab;

    addTabToStory(newTab);

    // expand explorer folders until file
    if (newTab !== undefined && newTab.type === "code-editor") {
      expandUntilFile(newTab.args.path);
    }
  }

  function addTabToStory(newTab: TabWithArgsType[number]) {
    // limits the history
    if (selectedTabHistory.length > 8) {
      selectedTabHistory.shift();
    }

    // add to history
    selectedTabHistory.push(newTab);
  }

  /** tab is active */
  function isActive(tab: {
    type: TabWithArgsType[number]["type"];
    args: {
      id?: TabWithArgsType[number]["args"]["id"];
    };
  }) {
    return (
      selectedTab &&
      tab &&
      tab.type === selectedTab.value?.type &&
      tab.args.id === selectedTab.value?.args?.id
    );
  }

  return {
    selectedTab,
    setSelectedTab,
    isActive,
    openTab,
    openTabs,
    closeTtab: closeTab,
    isFirstTabSelected,
  };
});

// -----------------
// Helpers
// -----------------
/** Is a given tab already open
 * @param newTab - tab to open
 * @param openTabs - list of open tabs
 */
function isTabAlreadyOpen(
  newTab: TabWithArgsType[number],
  openTabs: TabWithArgsType[number][]
) {
  return openTabs.some(
    (openTab) =>
      openTab.type === newTab.type && openTab.args.id === newTab.args.id
  );
}

function getLastOpenSelectedTab(
  selectedTabHistory: TabWithArgsType[number][],
  openTabs: TabWithArgsType[number][]
) {
  let index = selectedTabHistory.length - 2;

  while (index > 0) {
    if (isTabAlreadyOpen(selectedTabHistory[index], openTabs)) {
      return selectedTabHistory[index];
    }

    index--;
  }
}

function getLastOpenTab(openTabList: TabWithArgsType[number][]) {
  return openTabList[openTabList.length - 1];
}

export default useTabsStore;
