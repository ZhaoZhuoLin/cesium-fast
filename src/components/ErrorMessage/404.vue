<template>
  <div class="ct-not-container">
    <img src="@/assets/image/404.png" class="not-img" alt="403" />
    <div class="ct-not-detail">
      <!-- <h2>404</h2> -->
      <h4>服务器无法找到请求的文件、页面或资源~🙅‍♂️🙅‍♀️</h4>
      <el-button type="primary" @click="toLogin"> 返回上一页 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
const router = useRouter();
const toLogin =()=>{
  router.push(HOME_URL);
}
</script>

<style scoped lang="scss">
.ct-not-container{
  height: 100%;
  display: flex;
  align-items: center;
  justify-self: center;
}
 </style>
