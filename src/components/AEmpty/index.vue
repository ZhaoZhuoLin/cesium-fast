<template>
  <el-empty description="当前暂无" class="empty" :image="emptyImg"> </el-empty>
</template>
<script setup lang="ts" name="AEmpty">
import emptyImg from "@/assets/image/empty.png";
</script>
<style scoped lang="scss">
.empty {
  width: 100%;
  height: 100%;
}
.el-empty__image {
  width: 15% !important;
}
</style>
