<template>
  <div class="file-grid">
    <FileItem
      v-for="file in files"
      :key="file.id"
      :file="file"
      @click="handleItemClick(file)"
    />
  </div>
</template>

<script setup lang="ts">
import FileItem from './FileItem.vue'
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
defineOptions({
  name: 'FileGrid'
})

defineProps<{ files: SikaFileMeta[] }>()

const emit = defineEmits(['open-folder', 'preview-file'])

const handleItemClick = (file: SikaFileMeta) => {
  if (file.metaType === MetaTypeEnum.FILE.value) {
    emit('open-folder', file.id)
  } else {
    emit('preview-file', file.id)
  }
}
</script>

<style scoped>
.file-grid {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>