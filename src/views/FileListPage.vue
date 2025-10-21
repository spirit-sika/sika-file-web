<template>
  <!-- 头部标题和操作按钮 -->
  <div class="header">
    <div style="display: flex; justify-content: center">
      <h1 @click="toHome">跨境文件管理系统</h1>
    </div>
    <div>
      <el-button plain type="primary" :icon="Upload" @click="openDialog('upload')">上传文件</el-button>
      <el-button plain type="success" :icon="FolderAdd" @click="openDialog('mkdir')">新建文件夹</el-button>
    </div>
  </div>

  <!-- 路径导航 -->
  <PathNavigation :path="pathLayers"/>

  <!-- 操作栏：搜索和筛选 -->
  <ActionBar
    v-model:active-filter="fileType"
    v-model:search-text="fileLikeName"
    @filter-change="pageFile"
  />

  <!-- 文件列表 -->
  <!-- todo: 过滤后为空或者是空文件时默认提示内容 -->
  <FileGrid :files="fileList"/>

  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="currentSize"
    :page-sizes="[10, 20, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <upload-dialog
    v-model:visible="visible"
    v-model:dialog-type="dialogType"
    @complete="pageFile"
  />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { storeToRefs } from 'pinia'
import {onBeforeMount, watch} from 'vue'
import PathNavigation from "@/components/PathNavigation/index.vue";
import ActionBar from "@/components/ActionBar/index.vue";
import {FolderAdd, Upload} from "@element-plus/icons-vue";
import {useFileStore} from '@/stores/path.ts'
import {useUploadStore} from '@/stores/upload.ts'
import FileGrid from "@/components/FileGrid/index.vue";
import UploadDialog from "@/components/uploadDialog/index.vue";


const route = useRoute();
const router = useRouter();

const fileStore = useFileStore()
const {fileType, fileLikeName, currentPage, currentSize, total, pathLayers, fileList} = storeToRefs(fileStore)
const {pageFile, handleSizeChange, handleCurrentChange, loadPathInfo} = fileStore

const uploadStore = useUploadStore()
const {dialogType, visible} = storeToRefs(uploadStore)

const openDialog = (type: 'upload' | 'mkdir') => {
  dialogType.value = type
  visible.value = true
}

const toHome = () => {
  router.push('/file-tree/root')
}
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