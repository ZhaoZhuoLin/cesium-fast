import {
  defineStore
} from "pinia"
import {
  getLogin,
  getUserInfo,
  userLogout
} from "@/api/user.ts";

import { setStorage } from "@/utils/storage.js"
import { Login } from "@/api/interface"


export const useUserStore = defineStore({
  id: "userState",
  state: () => {
    return {
      // 登录token
      token: null,
      // 登录用户信息
      userInfo: {}
    }
  },
  actions: {
    // 登录
    async login(userInfo: Login.ReqLoginForm) {
      return new Promise(async (resolve) => {
        let res: any = await getLogin(userInfo)
        if (res) {
          this.token = res.token;
        }
        setStorage("awm-server-token", JSON.stringify(res.token))
        this.getInfo()
        resolve(res.token)
      })
    },
    //获取用户信息
    async getInfo() {
      return new Promise(async (resolve) => {
        let res = await getUserInfo();
        this.userInfo = res;
        setStorage("awm-server-user-info", JSON.stringify(this.userInfo))
        resolve(res)
      })
    },
    //推出登录
    async logout() {
      return new Promise(async (resolve) => {
        let res = await userLogout();
        this.token = null;
        resolve(res)
      })
    }
  },
  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'awm-server-userState',
    //保存的位置
    storage: window.localStorage, //localstorage
  },
})
