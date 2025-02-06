<template>
  <div class="ct-tabs-box">
    <div class="ct-tabs-menu">
      <el-tabs v-model="tabsMenuValue"  @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
          <template #label>
            <el-icon v-if="item.icon && tabsIcon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <!-- <MoreButton/> -->
    </div>
  </div>
</template>
<script setup lange='ts'>
import { useRoute, useRouter } from "vue-router";
import {useTabsStore} from "@/stores/modules/tabs.ts"
import {useGlobalStore} from "@/stores/modules/global.ts"
import MoreButton from "./components/MoreButton.vue";


import {ref,watch,computed} from "vue";
const route = useRoute();
const router = useRouter();

const tabStore = useTabsStore();
const globeStore = useGlobalStore();
const tabsMenuList = computed(()=>tabStore.tabsMenuList)
const tabsMenuValue = computed(()=>route.fullPath)
const tabsIcon = computed(()=>globeStore.tabsIcon)

// 监听路由变化
watch(
  () => route.fullPath,
  () => {
    // if (route.meta.isFull) return;
    // tabsMenuValue.value = route.fullPath;
    // const tabsParams = {
    //   icon: route.meta.icon,
    //   title: route.meta.title,
    //   path: route.fullPath,
    //   name: route.name,
    //   close: !route.meta.isAffix,
    //   isKeepAlive: route.meta.isKeepAlive
    // };
    // tabStore.addTabs(tabsParams);
  },
  { immediate: true }
);

const tabClick =(tabItem)=>{
 const fullPath = tabItem.props.name;
//  console.log("fullPath",fullPath);
 router.push(fullPath);
 console.log("route.path", route.path);

}

const tabRemove =(fullPath)=>{
  tabStore.removeTabs(fullPath,fullPath==route.fullPath)
}



 </script>
<style scoped lang="scss">
@import "./index.scss"
</style>
