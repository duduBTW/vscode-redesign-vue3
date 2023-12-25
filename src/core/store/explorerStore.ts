import { defineStore } from "pinia";
import { reactive } from "vue";

const useFileExplorerStore = defineStore("file-explorer", () => {
  const expandedFolders = reactive<string[]>([]);

  function toggleFolder(path: string) {
    const selectedFolderIndex = expandedFolders.indexOf(path);

    if (selectedFolderIndex === -1) {
      expandedFolders.push(path);
    } else {
      expandedFolders.splice(selectedFolderIndex, 1);
    }
  }

  function closeAll() {
    expandedFolders.splice(0);
  }

  const isExpanded = (path: string) => {
    return expandedFolders.includes(path);
  };

  const expandUntilFile = (finalPath: string) => {
    const destinationList = finalPath.split("/");
    destinationList.pop();

    while (destinationList.length > 0) {
      const path = destinationList.join("/");

      if (!expandedFolders.includes(path)) {
        expandedFolders.push(path);
      }

      destinationList.pop();
    }
  };

  return { toggleFolder, isExpanded, closeAll, expandUntilFile };
});

export default useFileExplorerStore;
