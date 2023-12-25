import CodePage from "../../presentation/code/Page.vue";
import ExtensionPage from "../../presentation/extension/ExtensionPage.vue";
import SettingsPage from "../../presentation/settings/SettingsPage.vue";
import UserPage from "../../presentation/user/UserPage.vue";

export type CodeEditorTabArgs = {
  content: string;
  id: string;
  title: string;
  path: string;
};

export type TabWithArgsType = [
  {
    type: "code-editor";
    args: CodeEditorTabArgs;
  },
  {
    type: "extension-list";
    args: {
      content: "string";
      id: undefined;
      title: string;
    };
  },
  {
    type: "extension-item";
    args: {
      id: string;
      title: string;
    };
  },
  {
    type: "user";
    args: {
      id: undefined;
      title: string;
    };
  },
  {
    type: "settings";
    args: {
      id: undefined;
      title: string;
    };
  }
];

export const tabToContentMapping = {
  "code-editor": CodePage,
  "extension-item": ExtensionPage,
  "extension-list": CodePage,
  user: UserPage,
  settings: SettingsPage,
} satisfies Record<TabWithArgsType[number]["type"], any>;
