import { defineStore } from "pinia"
import { KeepAliveState } from "../type"

export const useKeepAliveStore = defineStore({
  id: "codetime-keepAlive",
  state: (): KeepAliveState => ({
    // 需要缓存的路由名称
    keepAliveName: []
  }),
  actions: {
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name)
    },
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name)
    },
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName
    }
  }
})
