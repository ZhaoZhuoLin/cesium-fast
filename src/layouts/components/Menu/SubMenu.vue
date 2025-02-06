<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <template v-if="!subItem.hidden">
      <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
        <template #title>
          <el-icon v-if="subItem.meta.icon">
            <component :is="subItem.meta.icon"></component>
          </el-icon>
          <span>{{ subItem.meta.title }}</span>
        </template>
        <SubMenu :menu-list="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
        <el-icon v-if="subItem.meta?.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <template #title>
          <div>
            <div>{{ subItem.meta.title }}</div>
            <span class="subItem-title-logo" v-if="subItem.meta?.iconSpare">{{
              subItem.meta.iconSpare
            }}</span>
          </div>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lange="ts" name="SubMenu">
import { useRouter } from "vue-router";
defineProps({
  menuList: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const handleClickMenu = (subItem) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
   router.push(subItem.path);
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
.subItem-title {
  display: flex;
  justify-content: space-between;
}
.subItem-title-logo {
  position: absolute;
  top: 0px;
  right: var(--el-menu-base-level-padding);
}
</style>
