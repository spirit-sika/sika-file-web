<script setup lang="ts">
import type {SikaFileMeta} from "@/types/fms.ts";
import FileItem from "@/components/FileList/FileItem.vue";

interface Props {
  fileList: SikaFileMeta[]
}
defineProps<Props>()
</script>

<template>
  <div
    v-for="item in fileList"
    :key="item.id"
  >
    <file-item :meta="item" />
  </div>
</template>

<style scoped>

</style>