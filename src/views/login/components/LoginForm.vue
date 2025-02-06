<template>
  <div class="login-title">
    <img
      class="icon"
      src="@/assets/image/logo.png"
      alt="logo"
      style="border-radius: 50%"
    />
    <!-- <h3 class="title">智创 · 人影数据中台管理系统</h3> -->
    <h3 class="title">人影数据中台管理系统</h3>
    <!-- <h3 class="title">商丘人工增雨（雪）综合管理系统</h3> -->
  </div>
  <el-form ref="loginFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="username">
      <el-input
        placeholder="请输入用户名"
        autoComplete="on"
        style="position: relative"
        v-model="ruleForm.username"
        @keyup.enter="submitForm(loginFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        placeholder="请输入密码"
        autoComplete="on"
        @keyup.enter="submitForm(loginFormRef)"
        v-model="ruleForm.password"
        type="password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="login-button" style="width: 100%">
      <el-button round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
      <el-button
        round
        size="large"
        type="primary"
        :loading="loading"
        @click="login(loginFormRef)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lange="ts" setup>
import { ref, reactive } from "vue";
import { HOME_URL } from "@/config";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { getTimeStateStr } from "@/utils/index";
import {initDynamicRouter} from "@/routers/modules/dynamicRouter.ts"
const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
const loginFormRef = ref();
const passwordType = ref("passwork");
const loading = ref(false);

const rules = reactive({
  password: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  username: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 表单数据
const ruleForm = reactive({
  username: "110000",
  password: "110000@ryzy",
});

// 显示密码图标
const showPwd = () => {
  passwordType.value = passwordType.value === "password" ? "" : "password";
};

// 执行登录
const login = (loginFormRef) => {
  console.log(123);
  if (!loginFormRef) return;
  loginFormRef.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      let data = await userStore.login(ruleForm);
      console.log(userStore.token);
      
      // 2. 添加动态路由
      await initDynamicRouter();

      //3.清空tabs和keeplive数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);

      //4. 跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录 Geeker-Admin",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
    } finally {
      loading.value = false;
    } 
  });
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
