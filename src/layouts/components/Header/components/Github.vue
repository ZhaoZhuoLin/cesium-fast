<template>
  <div class="ct-theme-github">
    <i :class="'iconfont icon-github'" class="toolBar-icon" @click="openDrawer()" ></i>
  </div>
</template>

<script name="ThemeSetting" setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  // mittBus.emit("openThemeDrawer");
};
 </script>
