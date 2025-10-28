<template>
  <div v-if="files.length === 0" class="empty-area-wrapper">
    <div>这里空空如也</div>
  </div>
  <div v-else class="file-grid">
    <FileItem
      v-for="file in files"
      :key="file.id"
      :file="file"
      @open-folder="handleItemClick"
      @preview-file="handleItemClick"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * @component FileGrid
 * @description 文件列表容器组件
 */
import FileItem from './FileItem.vue'
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
import {useRouter} from "vue-router";
defineOptions({
  name: 'FileGrid'
})

defineProps<{ files: SikaFileMeta[] }>()
const router = useRouter()

const handleItemClick = (file: SikaFileMeta) => {
  if (file.metaType === MetaTypeEnum.DIR.value) {
    router.push(`/file-grid/${file.id}`)
  }
  else {
    // todo: preview or download
  }
}
</script>

<style scoped>
.empty-area-wrapper {
  opacity: 0.5;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  background-color: #efefef;
  margin-bottom: 10px;
  border-radius: 20px;
}

.file-grid {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>