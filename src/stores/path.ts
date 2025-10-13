import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {requestFileInfo, requestFilePage} from "@/api/fms.ts";
import type {SikaFileMeta} from "@/types/fms.ts";
import {useRoute} from "vue-router";
import type {PageQuery} from "@/types/BaseTypes.ts";
import {MetaTypeEnum} from "@/consts/FileConsts.ts";

const rootId = 'root'
const rootPath = '全部文件'
const rootPathLayer = [{id: rootId, name: rootPath}]

export const useFileStore = defineStore('file',
  () => {
    const route = useRoute();
    // 面包屑数据
    const currentPath = ref<string>('')
    const pathLayers = ref<{ id: string, name: string }[]>(rootPathLayer)

    // 分页
    const currentPage = ref<number>(1)
    const currentSize = ref<number>(2)
    const total = ref<number>(0)

    const fileList = ref<SikaFileMeta[]>([])

    // 查询条件
    const fileType = ref<number>(MetaTypeEnum.ALL_TYPE.value)
    const fileLikeName = ref<string>('')


    /**
     * 加载当前路径信息, 并且面包屑导航所需信息
     */
    const loadPathInfo = () => {
      const id = route.params.id === rootId ? '' : route.params.id as string
      if (id === '') {
        return
      }
      requestFileInfo(id)
        .then(res => {
          if (res.code !== 200) {
            throw new Error(res.message)
          }
          const currentAbsolutePath = res.data.absolutePath
          const currentAbsoluteIdPath = res.data.absoluteIdPath
          currentPath.value = currentAbsolutePath
          const pathArray = currentAbsolutePath.split("/")
          const pathIdArray = currentAbsoluteIdPath.split("/")
          if (pathArray.length <= 1) {
            pathLayers.value = rootPathLayer
          }
          else {
            pathLayers.value = rootPathLayer
            for(let index = 0; index < pathArray.length; index++) {
              pathLayers.value.push({id: pathIdArray[index], name: pathArray[index] })
            }
          }
        })
        .catch(err => {
          ElMessage.error(err.message)
        })
    }

    /**
     * 获取文件列表, 默认获取根目录, 否则由路由参数决定获取那个文件夹中的文件
     */
    const pageFile = () => {
      requestFilePage(buildFilePageQueryParam())
        .then(res => {
          if (res.code !== 200) {
            throw new Error(res.message)
          }
          fileList.value = res.data.records
          total.value = res.data.total
          return res.data.records
        })
        .catch(err => {
          ElMessage.error(err.message)
        })
    }

    const buildFilePageQueryParam = (): PageQuery<Partial<SikaFileMeta>> => {
      const id = route.params.id === rootId ? '' : route.params.id as string
      return {
        current: currentPage.value,
        size: currentSize.value,
        condition: {
          parentId: id,
          metaType: fileType.value,
          originalName: fileLikeName.value
        }
      }
    }

    watch(fileType, pageFile)

    const handleSizeChange = (size: number) => {
      currentSize.value = size
      pageFile()
    }

    const handleCurrentChange = (current: number) => {
      currentPage.value = current
      pageFile()
    }

    return {
      currentPath,
      pathLayers,
      loadPathInfo,

      currentPage,
      currentSize,
      total,
      pageFile,
      handleSizeChange,
      handleCurrentChange,

      fileType,
      fileLikeName,

      fileList
    }
  }
)