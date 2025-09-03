<template>
  <file-list
    :file-list="dataList"
    @to-dir="toDir"
    @to-file="showFile"
  />
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, shallowRef, watch} from 'vue'
import {requestFileList} from "@/api/fms.ts";
import type {SikaFileMeta} from "@/types/fms.ts";
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

const toDir = (id: string) => {
  router.push({path: `/file-tree/${id}`})
}

const showFile = (file: SikaFileMeta) => {
  console.log(file)
  ElMessage({
    message: '文件查看功能暂未开放',
    type: 'warning'
  })
}

watch(() => route.params.id, loadFileList)

onBeforeMount(loadFileList)
</script>

<style scoped>

</style>