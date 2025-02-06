import { defineStore } from "pinia"
import { TabsMenuProps, TabsState } from "../type"
import { useKeepAliveStore } from "./keepAlive.ts"
import piniaPersistConfig from "../persist"
import router from "@/routers/index.ts";

const keepAliveStore = useKeepAliveStore();
export const useTabsStore = defineStore({
  id: "codetime-tabs",
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  getters: {

  },
  actions: {

    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem)
      }
      if (keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.name)
      }
    },

    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },

    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return
          router.push(nextTab.path)
        })
      }
      const tabItem = this.tabsMenuList.find((item) => item.path == tabPath)
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path)
      this.tabsMenuList = this.tabsMenuList.filter(item => item.path != tabPath)
    }
  },
  persist: piniaPersistConfig("awm-server-codetime-tabs")
})
