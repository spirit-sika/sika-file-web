<script setup lang="ts">
import type {SikaFileMeta} from "@/types/fms.ts";
import FileItem from "@/components/FileList/FileItem.vue";
import {MetaType} from "@/consts/FileConsts.ts";

interface Props {
  fileList: SikaFileMeta[]
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'to-dir', id: string): void
  (e: 'to-file', meta: SikaFileMeta): void
}>()

/**
 * 处理文件或文件夹点击事件, 点击文件夹时重新请求文件夹中的文件列表
 * @param meta
 */
const bubblingEmit = (meta: SikaFileMeta) => {
  meta.metaType === MetaType.FILE ? emit('to-file', meta) : emit('to-dir', meta.id)
}

const handleRemove = (meta: SikaFileMeta) => {
  if (meta.metaType === MetaType.DIR) {
    ElMessageBox.confirm('删除文件夹会将文件夹下的所有文件都删除, 此操作不可恢复! 确定要删除吗？', '提示', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {})
  }
  else {
    ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {})
  }
}
</script>

<template>
  <div
    v-for="item in fileList"
    :key="item.id"
  >
    <file-item
      :meta="item"
      @click="bubblingEmit(item)"
      @remove="handleRemove"
    />
  </div>
</template>

<style scoped>

</style>