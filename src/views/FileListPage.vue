<template>
  <!-- 头部标题和操作按钮 -->
  <div class="header">
    <div style="display: flex; justify-content: center">
      <h1>跨境文件管理系统</h1>
    </div>
    <div>
      <el-button type="primary" :icon="Upload" @click="showUploadDialog">上传文件</el-button>
      <el-button type="success" :icon="FolderAdd" @click="createFolder">新建文件夹</el-button>
    </div>
  </div>

  <!-- 路径导航 -->
  <PathNavigation :path="pathLayers"/>

  <!-- 操作栏：搜索和筛选 -->
  <ActionBar
    v-model:active-filter="fileType"
    v-model:search-query="fileLikeName"
    @filter-change="pageFile"
  />

  <!-- 文件列表 -->
  <FileGrid :files="fileList"/>

  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="currentSize"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { storeToRefs } from 'pinia'
import {onBeforeMount, watch} from 'vue'
import type {SikaFileMeta} from "@/types/fms.ts";
import PathNavigation from "@/components/PathNavigation/index.vue";
import ActionBar from "@/components/ActionBar/index.vue";
import {FolderAdd, Upload} from "@element-plus/icons-vue";
import {useFileStore} from '@/stores/path.ts'
import FileGrid from "@/components/FileGrid/index.vue";


const route = useRoute();
const router = useRouter();

const fileStore = useFileStore()
const {fileType, fileLikeName, currentPage, currentSize, total, pathLayers, fileList} = storeToRefs(fileStore)
const {pageFile, handleSizeChange, handleCurrentChange, loadPathInfo} = fileStore

const toDir = (id: string) => {
  router.push({path: `/file-tree/${id}`})
}

const showFile = (file: SikaFileMeta) => {
  console.log(file)
  ElMessage({
    message: '文件查看功能暂未开放',
    type: 'warning'
  })
}

const showUploadDialog = () => {}
const createFolder = () => {}

watch(() => route.params.id, () => {
  pageFile()
  loadPathInfo()
})

onBeforeMount(() => {
  pageFile()
  loadPathInfo()
})
</script>

<style scoped>
.header {
  margin-bottom: 10px;
}
</style>