<script setup lang="ts">
import type {SikaFileMeta} from "@/types/fms.ts";
import file from '@/assets/img/icons/mingcute_file-zip-line.png'
import dir from '@/assets/img/icons/famicons_file-tray-outline.png'

import {MetaType} from "@/consts/FileConsts.ts";
import {computed} from "vue";

interface Props {
  meta: SikaFileMeta
}
const prop = defineProps<Props>()

const iconSrc = computed(() => {
  return prop.meta.metaType === MetaType.DIR ? dir : file
})
</script>

<template>
  <div class="file-item-wrapper">
    <img :src="iconSrc" alt="?">
    <div>{{meta.originalName}}</div>
  </div>
</template>

<style scoped lang="scss">
.file-item-wrapper {
  display: flex;
  align-items: center;
  line-height: 40px;

  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
}
</style>