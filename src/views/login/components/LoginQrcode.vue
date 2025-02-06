<script setup lange="ts">
import vueQr from "vue-qr/src/packages/vue-qr.vue";
</script>
<template>
  <div class="login-qrcode">
    <!-- <h2 class="title">智创 · 人影数据中台</h2> -->
    <!-- <h2 class="title">综合管理系统</h2> -->
    <vue-qr text="https://github.com/zouzhibin/vue-admin-perfect"></vue-qr>
  </div>
</template>
<style lang="scss" scoped>
@import "../index";
</style>
