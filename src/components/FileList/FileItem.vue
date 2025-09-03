<template>
  <div class="file-item-wrapper" >

    <div class="file-name-wrapper file" :class="{'dir': meta.metaType === MetaType.DIR}">
      <img :src="iconSrc" alt="?">
      <div>{{meta.originalName}}</div>
    </div>

    <div class="file-operator-wrapper" @click.stop="handleClick">
      <el-icon :size="30">
        <CloseBold />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {SikaFileMeta} from "@/types/fms.ts";
import file from '@/assets/img/icons/mingcute_file-zip-line.png'
import dir from '@/assets/img/icons/famicons_file-tray-outline.png'

import {MetaType} from "@/consts/FileConsts.ts";
import {computed} from "vue";
import {CloseBold} from "@element-plus/icons-vue";

interface Props {
  meta: SikaFileMeta
}
const prop = defineProps<Props>()

const iconSrc = computed(() => {
  return prop.meta.metaType === MetaType.DIR ? dir : file
})

const emit = defineEmits<{
  (e: 'remove', meta: SikaFileMeta): void
}>()

const handleClick = () => {
  emit('remove', prop.meta)
}
</script>

<style scoped lang="scss">
.file-item-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;

  .file-name-wrapper {
    display: flex;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  }
}

.file {
  color: #454547;
  font-size: 20px;
}

.dir {
  color: cornflowerblue;
  text-decoration: underline;
}
</style>