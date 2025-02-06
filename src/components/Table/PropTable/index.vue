<template>
  <div class="zb-pro-table">
    <div class="header" v-if="searchFormShow">
      <SearchForm @submit="onSubmit" :columns="baseFormColumns" />
    </div>

    <!----------底部---------------------->
    <div class="footer">
      <!-----------工具栏操作工具----------------->
      <div class="operator">
        <slot name="btn"></slot>
      </div>

      <!-- ------------表格--------------->
      <div class="table">
        <el-table
          class="zb-table"
          v-loading="loading"
          @selection-change="(val) => emit('selection-change', val)"
          :data="list"
          :border="true"
        >
        <el-table-column type="index" width="50" />

          <template v-for="item in columns">
            <el-table-column
              v-bind="{ ...item, ...{ prop: item.name } }"
              v-if="item.slot"
            >
              <template #default="scope">
                <slot :name="item.name" :item="item" :row="scope.row"></slot>
              </template>
            </el-table-column>
            <el-table-column v-else v-bind="{ ...item, ...{ prop: item.name } }" />
          </template>
        </el-table>
      </div>
      <!-- ------------分页--------------->
      <div class="pagination" v-if="searchPagination">
        <el-pagination
          v-model:currentPage="pagination.currentPage"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import SearchForm from "@/components/SearchForm/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const emit = defineEmits(["reset", "onSubmit", "selection-change","handleCurrentChange"]);
let props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  total:{
    type: Number,
    default: true,
  },
  searchFormShow:{
    type: Boolean,
    default: false,
  },
  searchPagination:{
    type: Boolean,
    default: false,
  }
});

// 过滤调需要进行搜索选择的
const baseFormColumns = computed(() => {
  return props.columns.filter((item) => item.valueType && item.search);
});

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
});

const currentPage = ref(1);
// 收缩展开
const isExpand = ref(false);
const handleSizeChange = (val) => {
  emit("handleSizeChange",val)
 };
const handleCurrentChange = (val) => {
  emit("handleCurrentChange",val)
  };

const list = computed(() => {
  let arr = JSON.parse(JSON.stringify(props.data));
   return arr
 });

const listLoading = ref(false);
const confirmEdit = (row) => {
  row.edit = false;
};
const cancelEdit = (row) => {
  row.edit = false;
};

import { reactive } from "vue";

let obj = {};
let search = [];
for (let item of props.columns) {
  if (item.inSearch) {
    obj[item.name] = null;
  }
  if (item.inSearch) {
    search.push(item);
  }
}
const formSearchData = ref(search);
const formInline = reactive(obj);

const onSubmit = () => {
  emit("onSubmit", formInline);
};

const reset = () => {
  formSearchData.value.forEach((item) => {
    formInline[item.name] = null;
  });
  emit("reset");
};
const deleteAction = (row) => {
  ElMessageBox.confirm("你确定要删除当前项吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true,
  })
    .then(() => {
      list.value = list.value.filter((item) => item.id !== row.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};
</script>
<style scoped lang="scss">
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.zb-pro-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    padding: 16px 16px 0 16px;
    margin-bottom: 16px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    :deep(.advancedForm) {
      flex: 1;
    }
  }
  .footer {
    flex: 1;
    display: flex;
    padding: 16px;
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    min-height: 620px;
    .operator {
      margin-bottom: 15px;
    }
    .table {
      position: relative;
      flex: 1;
    }
    .zb-table {
      position: absolute;
      height: 100%;
    }
  }
  :deep() {
    .el-table__header th {
      font-size: 15px;
      font-weight: 700;
      color: #252525;
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    box-sizing: border-box;
  }
}
</style>
