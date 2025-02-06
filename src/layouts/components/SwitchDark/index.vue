<template>
  <el-switch v-model="globalStore.isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="switchDark" />
</template>
<script setup lange='ts'>
import { useTheme} from  "@/hooks/useTheme"
import  {useGlobalStore} from "@/stores/modules/global.ts"
import { Sunny, Moon } from "@element-plus/icons-vue";

const globalStore = useGlobalStore();
const {sitchDark} = useTheme();
</script>
<style scoped>
</style>
