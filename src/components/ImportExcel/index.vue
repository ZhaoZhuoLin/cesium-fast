<template>
  <el-dialog v-model="dialogVisible" :title="`批量添加${parameter.title}`">
    <el-form label-width="100px">
      <el-form-item label="模板下载 :">
        <el-button type="primary" :icon="Download" @click="downloadTemp">
          点击下载
        </el-button>
      </el-form-item>
      <el-form-item label="文件上传 :">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          action=""
          :auto-upload="false"
        >
          <slot name="empty">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </slot>

          <template #tip>
            <div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文件，文件最大为{{ parameter.fileSize }}M</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="数据覆盖 :">
        <el-switch v-model="parameter.isCover" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts" name="ImportExcel">
import { ref } from "vue";
import { Download } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export interface ExcelParameterProps {
  title: string; //标题
  fileSize?: number; //上传文件的大小
  fileType?: File.ExcelMimeType[];
  downloadTempUrl: string;
  isCover: boolean; //数据默认覆盖
}
 

// dialog显隐
const dialogVisible = ref(false);

// 父组件传过来的参数
const parameter = ref<ExcelParameterProps>({
  title: "",
  fileSize: 5,
  fileType: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  downloadTempUrl: "",
  isCover: true,
});

/**
 * 接收父组件参数
 * @param {ExcelParameterProps} params
 */
const acceptParams = (params: ExcelParameterProps) => {
  parameter.value = {
    ...parameter.value,
    ...params,
  };
  dialogVisible.value = true;
};

// 下载模板
const downloadTemp = () => {
  if (parameter.value.downloadTempUrl == "") {
    ElNotification({
      title: "温馨提示",
      message: "下载模板地址为空",
      type: "warning",
    });
  } else {
    // window.location.href(parameter.value.downloadTempUrl);
  }
};

defineExpose({
  acceptParams,
});
</script>
<style scoped></style>
