<template>
  <el-form-item
    :label="config?.label"
    v-if="config.valueType === 'input'"
    style="width: 100%"
  >
    <el-input v-model="value" v-bind="$attrs" />
  </el-form-item>
  <el-form-item
    :label="config?.label"
    v-if="config.valueType === 'select'"
    style="width: 100%"
  >
    <el-select v-model="value" v-bind="$attrs" style="width: 100%">
      <el-option
        v-for="item in config.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item
    :label="config?.label"
    v-if="config.valueType === 'date-picker'"
    style="width: 100%"
  >
    <el-date-picker v-model="value" v-bind="$attrs" style="width: 100%" />
  </el-form-item>
  <el-form-item
    :label="config?.label"
    v-if="config.valueType === 'cascader'"
    style="width: 100%"
  >
    <el-cascader v-model="value" v-bind="$attrs" style="width: 100%" />
  </el-form-item>
  <el-form-item
    :label="config?.label"
    v-if="config.valueType === 'time-select'"
    style="width: 100%"
  >
    <el-time-select v-model="value" v-bind="$attrs" style="width: 100%" />
  </el-form-item>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue","config"]);

const value = computed({
  get() {
    return props?.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
  
<style lang="less" scoped></style>
