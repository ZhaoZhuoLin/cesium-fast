<template>
  <div id="cesiumContainer"></div>
  <div id="creditContainer" style="display: none"></div>
</template>
<script setup> 
import { ref, onMounted,onUnmounted } from "vue";
import "@cesium/engine/Source/Widget/CesiumWidget.css";
import CMap from "@/CFast/CMap.js"

let mapGlobe = null;
onMounted(() => {
   mapGlobe = new CMap('cesiumContainer', {
      handKeyEvent: true,
      onMouseMove: (position) => {
          console.log('当前坐标:', position);
      }
    }); 
});

onUnmounted(()=>{
  if(mapGlobe){
    mapGlobe.destroy();
  }
})
</script>
<style scoped lang="scss"></style>
 