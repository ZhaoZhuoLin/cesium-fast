import { defineStore } from "pinia"
import { getFlatMenuList, getAllBreadcrumbList } from "@/utils/index.ts"
import { asyncRouter } from "@/routers/modules/asyncRouter.ts"
import { AuthState } from "../type";
// const modules = import.meta.glob("@/views/**/*.vue");
// import { RouteLocationRaw } from "vue-router";
// import router from "@/routers/index";

export const useAuthStore = defineStore({
  id: "codetime-userAuth",
  state: (): AuthState => ({
    //当前页面路由名称
    routeName: "",

    // 按钮权限列表
    // authButtonList: [],

    // 菜单权限列表
    authMenuList: []
  }),
  getters: {
    // 按钮权限列表pauth
    authButtonListGet: state => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // 获取按钮权限列表
    async getAuthButtonList() {
      // const { data } = await getAuthButtonListApi();
      // this.authButtonList = [];
    },
    // 获取菜单列表
    async getAuthMenuList() {
      this.authMenuList = asyncRouter as Menu.MenuOptions[];
      // this.authMenuList = asyncRouter;
      // 一定要添加动态路由
      // this.flatMenuListGet.forEach(item => {
      //   item.children && delete item.children
      //   if (item.component && typeof item.component == "string") {
      //     item.component = modules["/src/views" + item.component + ".vue"];
      //   }
      //   if (item.meta.isFull) {
      //     router.addRoute(item as unknown as RouteLocationRaw);
      //   } else {
      //     router.addRoute("layout", item as unknown as RouteRecordRaw);
      //   }
      // });
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  },
})
