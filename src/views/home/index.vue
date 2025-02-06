<script setup lange="ts" name="home"></script>
<template>
  <div class="ct-card ct-content-box ct-home">
    <img
      class="home-bg"
      src="@/assets/image/index.svg"
      alt="welcome"
     
    />
  </div>
</template>
<style lang="scss" scoped>
.red {
  color: $primary-color;
}
.ct-home {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70%;
    height: 70%;
  }
}
</style>
