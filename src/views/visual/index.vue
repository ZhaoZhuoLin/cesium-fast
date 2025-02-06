<template>
  <div class="ct-card ct-content-box">
 
    <div class="cardList" v-if="currentCardList.length">
      <el-row :gutter="16">
        <el-col
          class="cardList-item"
          :xs="24"
          v-for="(item, index) in currentCardList"
          :key="index"
          :sm="10"
          :md="6"
          :lg="4"
          :xl="2"
        >
          <ACard
             @viewProduct="handleViewProduct"
            class="cardList-item"
            :card-info="item"
          />
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <AEmpty />
    </div>
  </div>
</template>
<script setup name="model">
import AEmpty from "@/components/AEmpty/index.vue";
import ACard  from "@/components/ACard/index.vue";
import { modelList } from "./config.js";
import {ref,onMounted} from "vue"
const currentCardList = ref(modelList);

 
onMounted(() => {});
 
const handleViewProduct = (value) => {
  console.log(value);
};
</script>
<style scoped>
.cardList-item {
  margin-bottom: 5px;
}
</style>
