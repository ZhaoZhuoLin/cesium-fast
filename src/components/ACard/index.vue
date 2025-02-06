<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <div>
          <span>{{ cardInfo.description }}</span>
        </div>
        <div>
          <!-- <el-switch
            v-model="cardInfo.status"
            class="ml-2"
            width="60"
            inline-prompt
            active-text="使用中"
            inactive-text="未使用"
          /> -->
        </div>
      </div>
    </template>
    <div class="cardInfo-description" @click="viewProduct">
      <div class="cardInfo-image">
        <img :src="cardInfo.image" />
      </div> 
    </div> 
  </el-card>
</template>
<script setup lang="ts" name="ACard">
interface CardInfo {
  typeid: string;
  name: string;
  description: string;
  image: string;
  status: boolean; //使用状态
}
interface CardProps {
  cardInfo: CardInfo; // 卡片的基本信息
}

const emit = defineEmits<{ 
  viewProduct: [value: any]; 
}>();
const props = withDefaults(defineProps<CardProps>(), {});
//  console.log(props)
// defineProps<CardInfo>({
//   cardinfo:{}
// })'
 
const viewProduct = () => {
  emit("viewProduct", props.cardInfo);
};
</script>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.cardInfo-description {
  display: flex;
  justify-content: space-between;
  .cardInfo-image {
    width: 100%;
    img {
      width: 100%;
      height: 12vh;
    }
  }
 // .cardInfo-description-text {
   // padding: 5px;
   // width: 65%;
  //  display: -webkit-box;
  //  -webkit-box-orient: vertical;
   // -webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数 */
   // overflow: hidden;
   // text-overflow: ellipsis; /* 溢出用省略号表示 */
  //  font-size: 13px;
 // }
}
</style>
