<template>
    <el-dropdown trigger="click" :teleported="false">
    <div class="more-button">
      <el-icon><ArrowDownBold /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>刷新
        </el-dropdown-item>   
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang='ts'>

const refresh =()=>{

}
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
