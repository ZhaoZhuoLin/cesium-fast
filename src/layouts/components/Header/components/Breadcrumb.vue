<template>
  <div
    :class="[
      'ct-breadcrumb-box mask-image',
      !useGlobalStore.breadcrumbIcon && 'ct-breadcrumb-no-icon',
    ]"
  >
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="ct-breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon
              v-if="item.meta.icon && globeStore.breadcrumbIcon"
              class="breadcrumb-icon"
            >
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup lange="ts">
import { computed } from "vue";
import { routerKey, useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { ArrowRight } from "@element-plus/icons-vue";
import { useGlobalStore } from "@/stores/modules/global.ts";
import { useAuthStore } from "@/stores/modules/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globeStore = useGlobalStore();

const breadcrumbList = computed(() => {
   let breadcrumbData =
  authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [
      {
        path: HOME_URL,
        meta: {
          icon: "Menu",
          title: "首页",
        },
      },
      ...breadcrumbData,
    ];
  }
  return breadcrumbData;
});

const onBreadcrumbClick = (item, index) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped>
.ct-breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .item-no-icon {
        transform: translateY(-3px);
      }
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
  }
}
.ct-breadcrumb-no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 4px;
      }
      .item-no-icon {
        transform: translateY(0);
      }
    }
  }
}
</style>
