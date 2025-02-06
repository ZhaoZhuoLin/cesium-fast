/**
 * @description 复制指令
 * 复制值到某个粘贴板
 * @example
 * <el-button v-copy="value"> 复制 </el-button>
 */

import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus"

interface ElType extends HTMLElement {
  copyData: string | Number;
  __handleClick__: any
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__)
  }
}

async function handleClick(this: any) {
  try {
    await navigator.clipboard.writeText(this.copyData);
  } catch (error) {
    console.error("复制操作不被支持或失败", error);
  }
  ElMessage({
    type: "success",
    message: "复制成功"
  })
}

export default copy
