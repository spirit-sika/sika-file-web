<template>
  <file-list :file-list="dataList" />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, shallowRef, watch} from 'vue'
import {requestFileList} from "@/api/fms.ts";
import type {SikaFileMeta} from "@/types/fms.ts";
import {MetaType} from "@/consts/FileConsts.ts";
import FileList from "@/components/FileList/FileList.vue";
const rootId = 'root'
const route = useRoute();
const router = useRouter();

const dataList = shallowRef<SikaFileMeta[]>([])

/**
 * 获取文件列表, 默认获取根目录, 否则由路由参数决定获取那个文件夹中的文件
 */
const loadFileList = () => {
  const id = route.params.id === rootId ? '' : route.params.id as string
  requestFileList(id)
    .then(res => {
      if (res.code === 200) {
        dataList.value = res.data
        return
      }
      throw new Error(res.message)
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
}

/**
 * 处理文件或文件夹点击事件, 点击文件夹时重新请求文件夹中的文件列表
 * @param meta
 */
const handleClick = (meta: SikaFileMeta) => {
  if (meta.metaType === MetaType.FILE) {
    ElMessage({
      message: '暂不支持查看文件',
      type: 'warning'
    })
    return
  }
  router.push({
    path: `/file-tree/${meta.id}`
  })
}

watch(() => route.params.id, loadFileList)

onMounted(loadFileList)
</script>

<style scoped>

</style>