<template>
  <div class="ct-card ct-content-box">
    <AEmpty />
  </div>
</template>
<script setup name="model">
import AEmpty from "@/components/AEmpty/index.vue";
import { ref, onMounted } from "vue";
import SelectFilter from "@/components/SelectFilter/index.vue";
import ACard from "@/components/ACard/index.vue";
   
 
onMounted(() => {
  
});
 
</script>
<style scoped>
.cardList-item {
  margin-bottom: 5px;
}
</style>
