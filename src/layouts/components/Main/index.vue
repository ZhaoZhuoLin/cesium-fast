
<template>
  <Tabs v-show="tabs" />
  <el-main>
    <router-view v-slot="{Component,route}">
      <transition  appear name="main-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
            <component :is="createComponentWrapper(Component,route)"  v-if="isRouterShow" :key="route.fullPath"></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-show="footer">
    <Footer />
  </el-footer>
</template>
<script setup lange='ts'>
import {computed,ref,h,onBeforeUnmount,provide} from "vue"
import { storeToRefs } from "pinia";
import {useGlobalStore } from "@/stores/modules/global.ts"
import {useKeepAliveStore } from "@/stores/modules/keepAlive.ts"
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue"
import { useDebounceFn } from '@vueuse/core'
const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore);
const {maximize, isCollapse, layout, tabs, footer} = storeToRefs(globalStore)

// 注册页面刷新的方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val)=> isRouterShow.value = val
provide("refresh",refreshCurrentPage)

const wrapperMap = new Map();
function createComponentWrapper(component, route) {
  if (!component) return;
  const wrapperName = route.fullPath;
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) };
    wrapperMap.set(wrapperName, wrapper);
  }
  return h(wrapper);
}

// 监听windows窗口变化
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(()=>{
  screenWidth.value = document.body.clientWidth;
  if(!maximize.value && screenWidth.value > 1200){
    globalStore.updateGlobalState("isCollapse",true)
  }
  if (isCollapse.value && screenWidth.value > 1200) {
    globalStore.updateGlobalState("isCollapse", false);
  }
},100)
window.addEventListener("resize",listeningWindow,false);
onBeforeUnmount(() => {
  window.removeEventListener("resize",listeningWindow)
})
</script>
<style scoped>
@import url("./index.scss");
</style>
