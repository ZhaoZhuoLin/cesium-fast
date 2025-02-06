<template>
  <div class="ct-select-filter">
    <div v-for="item in data" :key="item.key" class="ct-select-filter-item">
      <div class="ct-select-filter-item-title">
        <span>{{ item.title }} : &nbsp;</span>
      </div>
      <div>
        <el-scrollbar>
          <ul class="ct-select-filter-list" v-if="item.options.length">
            <li
              v-for="option in item.options"
              :key="option.value"
              @click="select(item, option)"
              :class="{
                active:
                option.value === selected[item.key] ||
                (Array.isArray(selected[item.key]) && selected[item.key].includes(option.value))
              }"
            >
              <slot :row="option">
                <el-icon v-if="option.icon">
                  <component :is="option.icon" />
                </el-icon>
                <span>{{ option.label }}</span>
              </slot>
            </li>
          </ul>
          <span v-else>暂无数据</span>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SelectFilter">
import {ref,watch} from "vue"
interface OptionProps{
  label: string;
  value: string;
  icon?:string;
}
interface SelectDataProps {
  title:string;
  key:string;
  options:OptionProps[];
  multiple:boolean;
}
interface SelectFilterProps {
  data?: SelectDataProps[]; // 选择的列表数据
  defaultValues?: { [key: string]: any }; // 默认值
}

const props = withDefaults(defineProps<SelectFilterProps>(), {
  data: () => [],
  defaultValues: () => ({})
});
// console.log(props)
const selected = ref<{[key:string]:any}>({});
watch(
  () => props.defaultValues,
  () => {
    props.data.forEach(item => {
      if (item.multiple) selected.value[item.key] = props.defaultValues[item.key] ?? [""];
      else selected.value[item.key] = props.defaultValues[item.key] ?? "";
    });
  },
  { deep: true, immediate: true }
);

const emit = defineEmits<{
  change:[value:any]
}>();

/**
 * @description 选择项筛选
 * @param {Object} item 选择项列表
 * @param {Object} option 选中值
 * @return {Object} selected.value
 */
const select = (item:SelectDataProps,option:OptionProps)=>{

  if(!item.multiple){
    // 单选
    if(selected.value[item.key]!==option.value) selected.value[item.key]=option.value;
  }else{
    // 多选

    // 选中第一个值，则直接设置
    if(item.options[0].value == option.value) selected.value[item.key]=[option.value]

    // // 选中的值存在，则删除该值
    if(selected.value[item.key].includes(option.value)){
      let currentIndex = selected.value[item.key].findIndex((s:any)=>s===option.value);
      selected.value[item.key].splice(currentIndex,1)

      // 全部删除后，则需要设置默认值为第一个
      if(selected.value[item.key].length==0){
        selected.value[item.key] = [item.options[0].value]
      }
    }else{
      // 选中值不存在,则添加
      selected.value[item.key].push(option.value);

      // 单选之后，若存在第一个值，则需要删除掉
      if(selected.value[item.key].includes(item.options[0].value)){
        selected.value[item.key].splice(0,1);
      }
    } 
  }
  emit("change",selected.value);
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
