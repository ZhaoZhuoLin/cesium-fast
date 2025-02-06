<template>
  <div class="ct-theme-setting">
    <i :class="'iconfont icon-shezhi'" class="toolBar-icon" @click="openDrawer()" ></i>
  </div>
</template>

<script name="ThemeSetting" setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
 </script>
