
<template>
    <div class="ct-tool-bar-lf">
    <!-- <CollapseIcon id="collapseIcon" /> -->
    <Breadcrumb v-show="glabalStore.breadcrumb" id="breadcrumb" />
   </div>
</template>
<script setup lange='ts'>
import { useGlobalStore } from "@/stores/modules/global";
import Breadcrumb from "./components/Breadcrumb.vue"
import CollapseIcon from "./components/CollapseIcon.vue"
const glabalStore = useGlobalStore();
</script>
<style scoped>
.ct-tool-bar-lf{
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
