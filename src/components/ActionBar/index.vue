<template>
  <div class="actions-bar">
    <div class="file-type-filter">
      <el-button
        :type="prop.activeFilter === MetaTypeEnum.ALL_TYPE.value ? 'primary' : ''"
        @click="handleFilterChange(MetaTypeEnum.ALL_TYPE.value)"
        plain
      >
        全部
      </el-button>

      <el-button
        :type="prop.activeFilter === MetaTypeEnum.DIR.value ? 'primary' : ''"
        @click="handleFilterChange(MetaTypeEnum.DIR.value)"
        plain
      >
        文件夹
      </el-button>

      <el-button
        :type="prop.activeFilter === MetaTypeEnum.FILE.value ? 'primary' : ''"
        @click="handleFilterChange(MetaTypeEnum.FILE.value)"
        plain
      >
        文件
      </el-button>
    </div>

    <div class="search-container">
      <el-input
        v-model="search"
        placeholder="搜索文件或文件夹..."
        :prefix-icon="Search"
        clearable
        @input="handleSearch"
      />
      <el-button type="primary" :icon="Search" plain @click="emitSearch">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";
defineOptions({
  name: 'ActionBar'
})

const prop = defineProps({
  activeFilter: {
    type: Number,
    default: MetaTypeEnum.ALL_TYPE.value
  },
  searchText: {
    type: String,
    default: ''
  }
})

const search = ref<string>('')

const emit = defineEmits(['update:active-filter', 'update:search-text', 'filter-change'])

const handleFilterChange = (active: number) => {
  emit('update:active-filter', active)
}

const handleSearch = () => {
  emit('update:search-text', search.value)
}

const emitSearch = () => {
  emit('filter-change', search.value)
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