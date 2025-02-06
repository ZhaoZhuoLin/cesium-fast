<template>
 <el-dropdown trigger="click">
    <div class="ct-avatar">
      <img src="@/assets/image/user.png" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon> 个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon> 修改密码
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lange='ts' name="Avatar">
import {LOGIN_URL} from "@/config"
import { ElMessageBox,ElMessage } from 'element-plus'
import {useUserStore} from "@/stores/modules/user.ts"
import {useRouter} from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const openDialog = ()=>{}
const logout = ()=>{
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    // 1.执行退出登录接口
    // await logoutApi();

    // 2.清除 Token
    // userStore.setToken("");

    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success("退出登录成功！");
  });
}
</script>
<style scoped lang="scss">
.ct-avatar {
  width: 30px;
  height: 30px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
} 
</style>
