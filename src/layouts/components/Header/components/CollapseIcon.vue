<template>
  <div  class="ct-collapseIcon flx-center" @click="changeCollapse">
    <div>
      <el-icon class="collapse-icon" id="ct-collapseIcon-box">
        <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
      <div v-if="!globalStore.isCollapse">收起导航</div>
    </div>
  </div>
</template>
<script setup lange="ts" name="CollapseIcon">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const changeCollapse = () =>
  globalStore.updateGlobalState("isCollapse", !globalStore.isCollapse);
</script>
<style scoped>
.ct-collapseIcon div{
  display: flex;
}
.ct-collapseIcon {
  cursor: pointer;
  height: 56px;
  font-size: var(--el-menu-item-font-size);
  color: var(--el-menu-text-color);
}
.collapse-icon {
  margin-right: 0px;
  font-size: 22px;
  color: var(--el-menu-text-color);
  cursor: pointer;
}
</style>
