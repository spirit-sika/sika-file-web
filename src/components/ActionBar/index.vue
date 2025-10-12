<template>
  <div class="actions-bar">
    <div class="file-type-filter">
      <el-button :type="prop.selectedFilter === MetaTypeEnum.ALL_TYPE.value ? 'primary' : ''" @click="handleFilterChange">全部</el-button>
      <el-button :type="prop.selectedFilter === MetaTypeEnum.DIR.value ? 'primary' : ''" @click="handleFilterChange">文件夹</el-button>
      <el-button :type="prop.selectedFilter === MetaTypeEnum.FILE.value ? 'primary' : ''" @click="handleFilterChange">文件</el-button>
    </div>

    <div class="search-container">
      <el-input
        v-model="prop.searchText"
        placeholder="搜索文件或文件夹..."
        :prefix-icon="Search"
        clearable
        @input="handleSearch"
      />
      <el-button type="primary" :icon="Search">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
import {Search} from "@element-plus/icons-vue";
defineOptions({
  name: 'ActionBar'
})

const prop = defineProps({
  selectedFilter: {
    type: Number,
    default: MetaTypeEnum.ALL_TYPE.value
  },
  searchText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:filter-change', 'update:searchText'])

const handleFilterChange = () => {
  emit('update:filter-change', prop.selectedFilter)
}

const handleSearch = () => {
  emit('update:searchText', prop.searchText)
}
</script>

<style scoped>
.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.file-type-filter {
  display: flex;
  gap: 10px;
}

.search-container {
  display: flex;
  gap: 10px;
}
</style>