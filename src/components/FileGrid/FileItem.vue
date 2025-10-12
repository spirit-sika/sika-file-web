<template>
  <div class="file-item" @click="handleClick">
    <div class="file-icon">
      <el-icon v-if="prop.file.metaType === MetaTypeEnum.DIR.value" class="folder-icon" size="48">
        <Folder />
      </el-icon>
    </div>
    <div class="file-name">{{ prop.file.originalName }}</div>
    <div v-if="prop.file.metaType === MetaTypeEnum.FILE.value" class="file-info">
      {{ formattedSize(prop.file.fileSize) }} · {{ prop.file.createTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Folder } from '@element-plus/icons-vue';
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
defineOptions({
  name: 'FileItem'
})

const prop = defineProps<{ file: SikaFileMeta }>()

const emit = defineEmits(['open-folder', 'preview-file'])

const handleClick = () => {
  if (prop.file.metaType === MetaTypeEnum.DIR.value) {
    emit('open-folder', prop);
  }
  else {
    emit('preview-file', prop);
  }
};

const formattedSize = (size: number) => {
  return size === 0 ? 0 : (size / 1024).toFixed(2) + 'KB';
}
</script>

<style scoped>
.file-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.file-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #409eff;
}

.file-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.folder-icon {
  color: #ffb800;
}

.file-name {
  font-size: 14px;
  color: #606266;
  word-break: break-word;
}

.file-info {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}
</style>