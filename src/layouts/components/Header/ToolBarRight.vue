<script setup lange='ts' name="ToolBarRight">
import Fullscreen from "./components/Fullscreen.vue";
 import ThemeSetting from "./components/ThemeSetting.vue";
 import Avatar from "./components/Avatar.vue";
 import Github from "./components/Github.vue";

</script>
<template>
  <div class="ct-tool-bar-rf">
    <div class="header-icon"> 
       <Fullscreen id="fullscreen" />
        <ThemeSetting id="ThemeSetting" />
        <Github id="Github"/> 
       <!-- <Avatar id="Avatar" /> -->
    </div>
  </div>
</template>
<style scoped>

.ct-tool-bar-rf {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  cursor: pointer;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
