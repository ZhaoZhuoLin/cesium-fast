<template>
  <div class="footer flx-center">
      <span>2024 CT Admin</span>
  </div>
</template>
<script>
import {computed} from "vue"
const footer = computed(()=>import.meta.env.VITE_FOOTER)
 </script>
<style scoped>
@import url("./index.scss");
</style>
