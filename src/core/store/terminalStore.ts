import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

const defaultTheme = {
  foreground: "#ffffff",
  background: "#27272a",
  cursor: "#ffffff",
  selection: "rgba(255, 255, 255, 0.3)",
  black: "#000000",
  brightBlack: "#808080",
  red: "#ce2f2b",
  brightRed: "#f44a47",
  green: "#00b976",
  brightGreen: "#05d289",
  yellow: "#e0d500",
  brightYellow: "#f4f628",
  magenta: "#bd37bc",
  brightMagenta: "#d86cd8",
  blue: "#1d6fca",
  brightBlue: "#358bed",
  cyan: "#00a8cf",
  brightCyan: "#19b8dd",
  white: "#e5e5e5",
  brightWhite: "#ffffff",
};

const useTerminalStore = defineStore("terminal-store", () => {
  const terminalOpen = ref(false);
  const term = ref<Terminal>();
  const termCurrentLineValue = ref("");

  function handleKeyUp(e: KeyboardEvent) {
    if (!e.ctrlKey || e.code !== "Backquote") {
      return;
    }

    terminalOpen.value = !terminalOpen.value;

    if (terminalOpen.value) {
      term.value?.focus();
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", handleKeyUp);

    term.value = new Terminal({
      theme: defaultTheme,
      fontFamily: "Hack",
      cursorBlink: true,
      allowProposedApi: true,
      rows: 5,
    });
    const fitAddon = new FitAddon();

    term.value.loadAddon(fitAddon);
    term.value.open(document.getElementById("xterm-container")!);
    fitAddon.fit();

    console.log(term.value);

    term.value.onKey((ev) => {
      if (ev.domEvent.key == "Enter") {
        if (termCurrentLineValue.value) {
          term.value?.write("\r\n");
        }
      } else if (ev.domEvent.key == "Backspace") {
        if (termCurrentLineValue.value) {
          termCurrentLineValue.value = termCurrentLineValue.value.slice(
            0,
            termCurrentLineValue.value.length - 1
          );
          term.value?.write("\b \b");
        }
      } else {
        termCurrentLineValue.value += ev.key;
        term.value?.write(ev.key);
      }

      // console.log(e.key);
      // if (e.key == "Backspace") {
      // }

      // termCurrentLineValue.value += e.key;
      // term.value?.write(e.key);
      // if (e.key == "\r") term.value?.write("\n");
    });
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyUp);
  });

  return {
    terminalOpen,
  };
});

export default useTerminalStore;
