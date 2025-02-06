/**
 * @description 防抖指令
 * @params binding.func {function}  防抖执行的函数
 * @params binding.millisecondNum {number} 防守毫秒数
 * @example:
 * <el-button v-debounce="{func:debouncefunc,millisecondNum:millisecondNum}">防抖按钮{{millisecondNum}}毫秒后执行</el-button>
 *  import { ref } from "vue"; 
 *  const millisecondNum = ref(500);
 *  const debouncefunc = ()=>{
 *    ElMessage.success("我是防抖按钮触发的事件");
 *  }
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value.func !== 'function') {
      throw "callback must be a function"
    }
    if (typeof binding.value.millisecondNum !== 'number') {
      throw "millisecondNum must be a number"
    }

    let timer: any = null;
    el.__handleClick__ = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value.func();
      }, binding.value.millisecondNum)
    }
    el.addEventListener("click", el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
}
export default debounce
