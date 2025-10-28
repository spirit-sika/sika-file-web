<template>
  <div
    class="file-item"
    @click="handleClick"
    @contextmenu.prevent="switchMenu"
  >
    <div class="file-icon">
      <el-icon v-if="prop.file.metaType === MetaTypeEnum.DIR.value" class="folder-icon" size="48">
        <Folder/>
      </el-icon>
    </div>
    <div class="file-name">{{ prop.file.originalName }}</div>
    <div v-if="prop.file.metaType === MetaTypeEnum.FILE.value" class="file-info">
      {{ formattedSize(prop.file.fileSize) }} · {{ prop.file.createTime }}
    </div>
  </div>

  <right-menu ref="rightMenuRef" :menu-items="menuItems" group-id="fileItem"/>
</template>

<script setup lang="ts">
/**
 * @component FileItem
 * @description 文件与文件夹展示组件，提供文件或文件夹的图标、名称、大小等信息
 */
import {useTemplateRef} from 'vue';
import {ElIcon} from 'element-plus';
import {Folder} from '@element-plus/icons-vue';
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";
import RightMenu from "@/components/RightMenu/index.vue";
import {computed} from "vue";

defineOptions({
  name: 'FileItem'
})

const prop = defineProps<{ file: SikaFileMeta }>()

const emit = defineEmits(['open-folder', 'preview-file'])

const handleClick = () => {
  if (prop.file.metaType === MetaTypeEnum.DIR.value) {
    emit('open-folder', prop.file);
  } else {
    emit('preview-file', prop.file);
  }
};

const formattedSize = (size: number) => {
  return size === 0 ? 0 : (size / 1024).toFixed(2) + 'KB';
}

const rightMenuRef = useTemplateRef('rightMenuRef')
const folderMenuItems = [
  {
    label: 'Open',
    action: () => {
      console.log('open-folder');
    }
  },
  {
    label: 'Delete',
    action: () => {
      console.log('delete');
    }
  }
];

const fileMenuItems = [
  {
    label: 'Preview',
    action: () => {
      console.log('preview-file');
    }
  },
  {
    label: 'Download',
    action: () => {
      console.log('download');
    }
  },
  {
    label: 'Delete',
    action: () => {
      console.log('delete');
    }
  }
];

const switchMenu = (event: MouseEvent) => {
  if (!rightMenuRef.value) {
    return
  }
  rightMenuRef.value.menuVisible ? rightMenuRef.value.hideMenu() : rightMenuRef.value.showMenu('fileItem', event)
}
const menuItems = computed(() => {
  return prop.file.metaType === MetaTypeEnum.DIR.value ? folderMenuItems : fileMenuItems;
})
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
  user-select: none;
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