<template>
  <el-upload
    class="upload-demo"
    drag
    action="/file/async"
    :show-file-list="true"
    v-model:file-list="fileList"
    :http-request="handleUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        file size less than 100MB
      </div>
    </template>
  </el-upload>
  <el-progress
    v-if="showProgress"
    :text-inside="true"
    :stroke-width="24"
    :percentage="percentage"
    :status="progressStatus"
  />
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type {UploadUserFile, UploadRequestOptions} from 'element-plus'
import {ref} from 'vue';
import {postFileWithProgress} from "@/api/fms.ts";
import {useRoute} from "vue-router";

defineOptions({
  name: 'SikaUpload'
})

// 是否展示进度条
const showProgress = ref(true)
// 进度条样式
const progressStatus = ref<''|'success'|'exception'|'warning'>('')
// 上传进度
const percentage = ref(0)
// 文件列表
const fileList = ref<UploadUserFile[]>([])
const route = useRoute()
// 是否上传完成
const finishing = ref(false)

/**
 * 文件上传, 预检验文件大小通过后将文件上传到当前文件夹并处理进度
 * @param options
 */
const handleUpload = async (options: UploadRequestOptions) => {
  if (options.file.size > 100 * 1024 * 1024) {
    ElMessage.error('file size is too large')
    return
  }
  fileList.value.forEach(item => {
    if (!item.raw) {
      return
    }
    const dirId = route.params.id as string ?? ''
    showProgress.value = true
    const data = new FormData();
    data.append('file', options.file)
    data.append('parentId', dirId)
    finishing.value = true
    postFileWithProgress(data,
      onProgress,
      (error) => {
        ElMessage.error(error)
        progressStatus.value = 'exception'
        finishing.value = false
      }
    )
  })
}

/**
 * 上传文件时处理进度
 * @param progress
 */
const onProgress = (progress: number) => {
  if (progress < 25) {
    progressStatus.value = 'warning'
  }
  else if (progress < 75) {
    progressStatus.value = ''
  }
  else {
    progressStatus.value = 'success'
  }
  percentage.value = progress
  if (progress >= 100) {
    ElMessage.success('上传成功!')
    finishing.value = false
  }
}

/**
 * 清除上传状态与文件列表
 */
const clearStatus = () => {
  progressStatus.value = ''
  percentage.value = 0
  showProgress.value = false
  fileList.value = []
}

defineExpose({
  finishing,
  clearStatus
})
</script>
