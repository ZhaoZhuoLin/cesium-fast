<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column v-for="header in headers" :key="header" :label="header" :prop="header.toLowerCase()"
				v-loading="loading">
				<template #default="{ row }">
					<slot :name="`cell-${header.toLowerCase()}`" :item="row">{{ row[header.toLowerCase()] }}</slot>
				</template>
			</el-table-column>
			<el-table-column v-if="actions.length > 0" label="操作" fixed="right" width="150">
				<template #default="{ row }">
					<el-button v-for="action in actions" :key="action.name" @click="() => action.handler(row)" size="small"
						:type="action.type || 'text'">
						{{ action.label }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页组件 -->
		<div class="pagination">
			<el-pagination 
				:current-page="currentPage" 
				:page-size="pageSize" 
				:total="total"
				@current-change="handlePageChange" 
				@size-change="handleSizeChange"
				layout="total, sizes, prev, pager, next, jumper" 
				:page-sizes="[10, 20, 30, 40, 50]" />
		</div>
	</div>
</template>
  
<script setup>
import { ref, computed, defineEmits, watch } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus';

const props = defineProps({
	headers: {
		type: Array,
		required: true,
	},
	data: {
		type: Array,
		required: true,
	},
	pageSize: {
		type: Number,
		default: 10,
	},
	actions: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: Number,
		default: 1,
	},
	total: {
		type: Number,
		default: 0,
	},
});

const emit = defineEmits(['update:modelValue', 'update:pageSize']);

const currentPage = ref(props.modelValue);
const pageSize = ref(props.pageSize);

const tableData = computed(() => {
	return props.data;
});

function handlePageChange(page) {
	currentPage.value = page;
	emit('update:modelValue', page);
}

function handleSizeChange(size) {
	pageSize.value = size;
	emit('update:pageSize', size);
	currentPage.value = 1; 
}

watch(() => props.modelValue, (newPage) => {
	currentPage.value = newPage;
});

watch(() => props.data, () => {
	console.log(props.data);
}, { immediate: true });
</script>
  
<style scoped>
.pagination {
	margin-top: 10px;
	float: right;
}
</style>
