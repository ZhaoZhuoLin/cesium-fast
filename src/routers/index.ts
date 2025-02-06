import NProgress from "@/utils/nprogress";
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/modules/user.ts"
import { useAuthStore } from "@/stores/modules/auth.ts"
import { staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import { pageRouter } from "@/routers/modules/pageRouter";
import { LOGIN_URL } from "@/config"
import { ROUTER_WHITE_LIST } from "../config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter.ts"
// const mode = import.meta.env.VITE_ROUTER_MODE
// const routerMode = {
//   hash: () => createWebHashHistory(),
//   history: () => createWebHistory()
// };


/**
 * @description 理由配置
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param hidden ==> 如果设置为ture不会显示在侧边栏中
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 */

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter, ...pageRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截跳转
 */
router.beforeEach(async (to, from, next) => {

  const userStore = useUserStore()
  const authStore = useAuthStore()

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList();
    await authStore.getAuthButtonList();

    NProgress.start();

    // 3. 判断页面是否在路由白名单，存在直接放行
    // if (ROUTER_WHITE_LIST.includes(to.path)) return next();

    // 3.1 判断访问登录页，有token就当前页面
    // if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    //   if (userStore.token) return next(from.fullPath);
    //   return next();
    // }

    // 4. 判断是否存在token，没有重定向到login页面
    // if (!userStore.token) return next({ path: LOGIN_URL, replace: true })

    // 5. 如果没有菜单列表，就重新初始化动态路由
    if (!authStore.authMenuListGet.length) {
      await initDynamicRouter();
      return next({ ...to, replace: true });
    }

    if (!router.hasRoute(to.name as string)) {
      await initDynamicRouter();
      return next({ ...to, replace: true });
    }

    // 页面正常访问
    next();
  } catch (error) {
    console.log(error);
  }
})

export const resetRouter = () => {

}

/**
 * @description 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done();
})

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});


export default router
