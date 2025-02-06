<template>
  <div class="ct-select-cascader">
    <el-cascader
      v-model="simCityValue"
      :options="simCityOptions"
      :props="simOptions"
      @change="simCityOptionsChange"
    ></el-cascader>
  </div>
</template>
<script setup lang="ts">
import {watch } from "vue"
import province from "./province.js";

const simOptions = {
  value: "code",
  label: "name",
};

type Props = {
  simCityValue:string[],
  defaultCityCode:string
}
type Options = {
  name:string,
  code:string,
  children:{ [key: string]: any }
}

withDefaults(defineProps<Props>(),{
  simCityValue:["110000","120000"],
  defaultCityCode:"110000"
})

 

const emit = defineEmits(["changeCascader"])
const simCityOptionsChange =(value)=>{
  emit("changeCascader",value)
}

/**
 * 生成适用于el-cascader的多级菜单选择
 * @param {*} adminCode
 * @returns
 */
const  getCascaderOptions = (code:string)=> {
  let options:Options = {
    name: '',
    code: '',
    children: []
  };
  let provinceCode = code.substr(0, 2);
  let cityCode = code.substr(0, 4);
  let isProvinceCode = code.substr(2, 4);
  let currProvince = province.find((pro:any) => {
    return pro.code == provinceCode;
  });

  // 是不是省级
  if (isProvinceCode == "0000") {
    return currProvince
  }


  if (currProvince && currProvince.children.length) {
    let city = currProvince.children.find((item:any) => {
      return item.code == cityCode;
    });
    options.code = city.code;
    options.name = city.name;
    if (city && city.children.length) {
      city.children.map((c:any) => {
        options.children.push({
          name: c.name,
          code: c.code
        });
        return c;
      });
    }
  }
  return options;
}
</script>
<style scoped lang="scss"></style>
