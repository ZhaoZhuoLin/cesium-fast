<template>
  <el-dialog
    v-model="internalVisible"
    :title="title"
    @close="handleClose"
    width=700
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="150px"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.name"
        :label="field.label"
        :prop="field.name"
      >
        <component
          v-if="field.type === 'input'"
          :is="'el-input'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
        />
        <component
          v-if="field.type === 'textarea'"
          :is="'el-input'"
          type="textarea"
          v-model="formData[field.name]"
          v-bind="field.attrs"
          class="custom-textarea"
        />
        <component
          v-if="field.type === 'select'"
          :is="'el-select'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </component>
        <component
          v-if="field.type === 'switch'"
          :is="'el-switch'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
        />
        <component
          v-if="field.type === 'slider'"
          :is="'el-slider'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
        />
        <component
          v-if="field.type === 'timepicker'"
          :is="'el-time-picker'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
          style="width: 15vw;"
        />
        <component
          v-if="field.type === 'datepicker'"
          :is="'el-date-picker'"
          v-model="formData[field.name]"
          type="date"
          v-bind="field.attrs"
          style="width: 15vw;"
        />
        <component
          v-if="field.type === 'datetimepicker'"
          :is="'el-date-picker'"
          v-model="formData[field.name]"
          type="datetime"
          v-bind="field.attrs"
          style="width: 15vw;"
        />
        <component
          v-if="field.type === 'upload'"
          :is="'el-upload'"
          :action="field.attrs.action"
          :list-type="field.attrs.listType || 'text'"
          v-model="formData[field.name]"
          v-bind="field.attrs"
        >
          <el-button slot="trigger" type="primary">上传文件</el-button>
        </component>
        <component
          v-if="field.type === 'radio'"
          :is="'el-radio-group'"
          v-model="formData[field.name]"
        >
          <el-radio
            v-for="option in field.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </component>
        <component
          v-if="field.type === 'checkbox'"
          :is="'el-checkbox-group'"
          v-model="formData[field.name]"
        >
          <el-checkbox
            v-for="option in field.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-checkbox>
        </component>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Form Modal',
  },
  fields: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  formRules: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:visible', 'submit', 'update:modelValue']);
const formData = ref({ ...props.modelValue });
const formRef = ref(null);
const internalVisible = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    internalVisible.value = newVal;
  }
);

watch(internalVisible, (newVal) => {
  emit('update:visible', newVal);
});

watch(
  () => props.modelValue,
  (newVal) => {
    formData.value = { ...newVal };
  }
);

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', formData.value);
      internalVisible.value = false;
    }
  });
};

const handleClose = () => {
  internalVisible.value = false;
  emit('update:visible', false); // Ensure parent is updated
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 16px;
}

.custom-textarea,
.el-select,
.el-input,
.el-switch,
.el-slider,
.el-upload {
  width: 15vw !important;
}
</style>
