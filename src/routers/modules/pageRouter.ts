import { RouteRecordRaw } from "vue-router";
export const pageRouter: RouteRecordRaw[] = [
  {
    path: "/01_create",
    name: "01_create",
    component: () => import("@/views/basic/components/01创建地球/index.vue"),
    meta: {
      title: "创建地球"
    }
  },
]
