<!-- 纵向布局 -->
<template>
  <el-container class="ct-layout">
      <el-aside>
          <div class="aside-container" :style="{width:isCollapse?'65px':'235px'}">
              <div class="logo-container flx-center">
                  <img class="logo-img" src="@/assets/image/logo.png" alt="代码时间">
                  <span v-show="!isCollapse" class="logo-text">{{ title }}</span>
               </div>
               <el-scrollbar>
                <el-menu
                  :router="false"
                  :default-active="activeMenu"
                  :collapse="isCollapse"
                  :unique-opened="accordion"
                  :collapse-transition="false"
                >
                  <SubMenu :menu-list="menuList" />
                </el-menu>
              </el-scrollbar>
              <CollapseIcon />
          </div>
      </el-aside>
      <el-container>
          <el-header>
            <ToolBarLeft/>
            <ToolBarRight/>
          </el-header>
          <Main/>
      </el-container>
  </el-container>
</template>

<script setup lange='ts' name="LayoutVertical">
import {computed,ref,watch} from "vue"
import {useRoute} from "vue-router"
import {useGlobalStore} from "@/stores/modules/global"
import {useAuthStore} from "@/stores/modules/auth.ts"
import CollapseIcon from "@/layouts/components/Header/components/CollapseIcon.vue"
import Main from "@/layouts/components/Main/index.vue"
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue"
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue"
import SubMenu from  "@/layouts/components/Menu/SubMenu.vue"
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const route = useRoute()

const title = import.meta.env.VITE_GLOB_APP_TITLE
const isCollapse = computed(()=>globalStore.isCollapse)
const accordion = computed(() => globalStore.accordion);
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu;
  }
   return path;
});
const menuList = computed(()=>authStore.authMenuListGet)
 </script>
<style scoped>
@import url("./index.scss");
</style>
