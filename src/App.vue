<script setup lange='ts'>
import {onMounted,computed} from "vue"
import {useGlobalStore} from "@/stores/modules/global"
import {useTheme} from "@/hooks/useTheme"
import {getBrowserLang} from "@/utils"
import { ElConfigProvider } from "element-plus";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const globalStore = useGlobalStore()
const { initTheme } = useTheme();
initTheme();

onMounted(() => {
   const language = globalStore.language?? getBrowserLang();
   globalStore.updateGlobalState("language",language)  
});

const locale  = computed(()=>{
  if(globalStore.language=="zh")return zhCn
  if(globalStore.language=="en")return en
  return getBrowserLang()=="zh"?zhCn:en;
}) 

const assemblySize = computed(()=> globalStore.assemblySize)
</script>
<template>
   <el-config-provider :locale="locale" :size="assemblySize">
    <router-view></router-view>
  </el-config-provider>
</template>
<style scoped>
</style>
