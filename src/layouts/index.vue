<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>
<script setup lange="ts" name=" ">
import { computed } from "vue";
import LayoutVertical from "@/layouts/LayoutVertical/index.vue";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import LayoutClassic from "@/layouts/LayoutClassic/index.vue";
import { useGlobalStore } from "@/stores/modules/global";

const LayoutComponents = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
};

const useGlobal = useGlobalStore();
const layout = computed(() => useGlobal.layout);
</script>
<style scoped></style>
